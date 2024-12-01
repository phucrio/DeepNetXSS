from web.main import app
import os
def clear_system_proxies():
    os.environ.pop('http_proxy', None)
    os.environ.pop('https_proxy', None)

clear_system_proxies() 
if __name__ == "__main__":
        app.run(host='0.0.0.0', port=8888,debug=True)