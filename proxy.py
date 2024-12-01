from httpx import AsyncClient
from fastapi import Request, FastAPI
from fastapi.responses import StreamingResponse, Response
from starlette.background import BackgroundTask
import logging
import urllib.parse
import html
import gzip
import brotli
import httpx
import zlib
from urllib.parse import urlparse, parse_qs
from web.model import predict_xss,load_model
from dataset.preprocess import decode_until_clear
from web.logger import  log_manager
from web.main import current_model,current_model_name
import os

def clear_system_proxies():
    os.environ.pop('http_proxy', None)
    os.environ.pop('https_proxy', None)

clear_system_proxies()
model_name = current_model_name
formatter = logging.Formatter('[+] %(asctime)s %(levelname)s %(message)s')
app = FastAPI(
    openapi_url=None,
    docs_url=None,
    redoc_url=None
)

HTTP_SERVER = AsyncClient(base_url="http://10.130.10.17:4280", follow_redirects=False, verify=False, timeout=10.0)

def save_log(source_ip, destination_ip, url, method, status, user_input, note):
    log_manager.insert_log(source_ip, destination_ip, url, method, status, user_input, note)
    
def setup_logger(name, log_file, level=logging.INFO):
    handler = logging.FileHandler(log_file)
    handler.setFormatter(formatter)
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)
    return logger

all_request_log = setup_logger('all_request_log', 'all_request.log')

def log_request(method, uri, headers, body, res_body=None, status=None, type_="all"):
    headers_str = ""
    for h in headers:
        headers_str += f"{h}: {headers[h]}\n"

    if type_ == "all":
        body_bytes_sent = len(res_body) if res_body else 0
        http_referer = headers.get('referer', "-")
        http_x_forwarded_for = headers.get('x-forwarded-for', "-")
        http_user_agent = headers.get('user-agent', "-")

        template = f'"{method} {uri}" "{status}" "{body_bytes_sent}" "{http_referer}" "{http_user_agent}" "{http_x_forwarded_for}" "{headers_str}" "{body}"'
        all_request_log.info(template)


def check_request(method, uri, headers, body, source_ip, destination_ip):
    note = "No XSS detected"
    user_input = "-"
    if uri is None:
        print("Warning: URI is None")
        return True
    if uri == '/':
        return True
    xss_check = 0
    uri = html.unescape(urllib.parse.unquote(uri.lower()))
    parsed_uri = urlparse(uri)
    print(parsed_uri)
    params = parse_qs(parsed_uri.query)
    print(params)
    for v in params.values():
        p = decode_until_clear(v[0])
        xss_check = predict_xss(current_model,p,model_name)
        if xss_check == 1:
            note = "Reflected XSS"
            user_input = p
            save_log(source_ip, destination_ip, uri, method, "403 Forbiden", user_input, note)
            return False
    if method == 'POST' or body: 
        params = parse_qs(body.decode())
        print(params)
        for v in params.values():
            p = decode_until_clear(v[0])
            print(p)
            xss_check = predict_xss(current_model,p,model_name)
            if xss_check == 1:
                note = "Stored XSS"
                user_input = p
                save_log(source_ip, destination_ip, uri, method, "403 Forbiden", user_input, note)
                return False 

    user_agent = headers.get('user-agent', '')

    # xss_check = predict_xss(current_model,user_agent)
    # if xss_check == 1:
    #     log_request(method, uri, headers, body, type_="black")
    #     return False
    save_log(source_ip, destination_ip, uri, method, "200 OK", user_input, note)
    return True

def content_encoding(content, alg):
    if alg == "gzip":
        return gzip.compress(content)
    elif alg == "br":
        return brotli.compress(content)
    elif alg == "deflate":
        return zlib.compress(content)
    return content

async def _reverse_proxy(request: Request):
    method = request.method
    uri = request.headers.get('raw-uri')
    if not uri:
        return Response(status_code=400, content="Bad Request: URI is missing.")

    headers_dict = {key.decode(): value.decode() for key, value in request.headers.raw}
    req_body = await request.body()
    source_ip = request.headers.get('X-Forwarded-For', request.client.host)


    # Destination IP
    destination_ip = request.url.hostname

    if check_request(method, uri, headers_dict, req_body, source_ip, destination_ip):
        rp_req = HTTP_SERVER.build_request(
            method,
            uri,
            headers=request.headers.raw,
            content=req_body
        )
        try:
            rp_resp = await HTTP_SERVER.send(rp_req, stream=False)
        except httpx.ConnectError as e:
            logging.error(f"Connection error: {e}")
            return Response(status_code=502, content="Bad Gateway: Cannot connect to upstream server.")
        res_headers = rp_resp.headers
        res_body = rp_resp.content

        task = None
        forward_headers = dict(rp_resp.headers)
        forward_status = rp_resp.status_code
        forward_content = content_encoding(res_body, forward_headers.get('content-encoding', ''))
        forward_headers['content-length'] = str(len(forward_content))

        # log_request(method, uri, headers_dict, req_body, res_body, forward_status, "all")

        if 'set-cookie' in forward_headers:
            cook = forward_headers.pop("set-cookie")
            forward_res = Response(
                content=forward_content,
                status_code=forward_status,
                headers=forward_headers,
                background=task,
            )
            for c in cook.split(", "):
                forward_res.raw_headers.append((b"set-cookie", c.encode("utf-8")))
        else:
            forward_res = Response(
                content=forward_content,
                status_code=forward_status,
                headers=forward_headers,
                background=task,
            )
        return forward_res

    else:
        # log_request(method, uri, headers_dict, req_body, "Forbidden", 403, "all")
        return Response(
            content="""
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>403 Forbidden</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px; }
                    h1 { font-size: 50px; color: #dc3545; }
                    p { font-size: 20px; color: #6c757d; }
                </style>
            </head>
            <body>
                <h1>403 Forbidden</h1>
                <p>You don't have permission to access this resource.</p>
            </body>
            </html>
            """,
            status_code=403,
            media_type="text/html"
        )

app.add_route("/{path:path}", _reverse_proxy, ["GET", "POST", "PUT", "DELETE", "OPTIONS"])
# uvicorn --host 0.0.0.0 --port 5000 --reload proxy:app --no-server-header --no-date-header
