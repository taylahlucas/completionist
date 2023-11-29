import json
import scrapy
from bs4 import BeautifulSoup

# Spider which scrapes lists of proxies to use for further scraping
class ProxySpider(scrapy.Spider):
    name = 'proxies'
    allowed_domains = ["free-proxy-list.net"]
    url = "https://free-proxy-list.net"
    headers = {
        'Accept': 'application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def start_requests(self):
        yield scrapy.http.Request(self.url, method='GET', headers=self.headers)

    def parse(self, response, *args):
        soup = BeautifulSoup(response.body, 'html.parser')
        ip_addresses = []
        proxies = soup.find_all('tr')
        for prox in proxies:
            valid = prox.find_all('td', {'class', 'hx'})
            if len(valid) > 0 and valid[0].text == 'yes':
                ip_addresses.append(prox.find_next('td').text)

        with open('ip_addresses.json', 'w') as file:
            file.write(json.dumps(ip_addresses))
            file.close()

