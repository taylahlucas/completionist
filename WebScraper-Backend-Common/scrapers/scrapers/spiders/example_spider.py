import sys
import json
import scrapy
from bs4 import BeautifulSoup
import datetime
from ..get_user_agents import get_ua

class ExampleSpider(scrapy.Spider):
    name = 'example-spider'
    allowed_domains = ["alloweddomains.com"]
    rental_items = []
    property_counts = []
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en",
        "User-Agent": get_ua()
    }

    def __init__(self, *args, **kwargs):
        self.params = json.loads(sys.argv[1])
        self.url = 'http://url'

        super().__init__(*args, **kwargs)

    def start_requests(self):
        yield scrapy.http.Request(self.url, method='GET', headers=self.headers)

    def parse(self, response):
      soup = BeautifulSoup(response.body, 'html.parser')
      # Sort through soup response

