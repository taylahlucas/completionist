import time
import requests
from os.path import exists
import json
from spiders.proxy_spider import ProxySpider
from scrapy.crawler import CrawlerProcess
from user_agents import get_ua

# Runs the proxy spider and find a usable proxy
def crawl_proxy_spider():
    process = CrawlerProcess(settings={
        'USER_AGENT': get_ua(),
        'ROBOTSTXT_OBEY': True,
        'LOG_LEVEL': 'INFO'
    })
    process.crawl(ProxySpider)
    process.start()


def get_proxies():
    crawl_proxy_spider()

    while not exists('ip_addresses.json'):
        time.sleep(1)

    with open('ip_addresses.json', 'r') as file:
        ip_addresses = json.load(file)

    # IP addresses contains list of proxies ready to use
    successful_proxies = []
    test_url = 'https://httpbin.org/ip'
    for ip in ip_addresses:
        print("Trying Request ", ip)
        try:
            response = requests.get(
                test_url,
                proxies={"http": ip, "https": ip}
            )
            print("Successful Connection: ", response)
            successful_proxies.append(ip)
            break
        except requests.exceptions.ProxyError:
            print("Skipping. Connection error")

    if len(successful_proxies) > 0:
        print("Writing proxy to file")
        with open('../../../valid_proxy.json', 'w') as file:
            file.write(json.dumps(successful_proxies[0]))
            file.close()
    else:
        print("Could not find any successful proxies.")


if __name__ == '__main__':
    # Uncmment to get randomized proxies
    # get_proxies()
