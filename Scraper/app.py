import os

from facebook_scraper import FacebookScraper
import requests
import json
import base64

fb = FacebookScraper()
print(fb.session.cookies)
fb.login('972584494256', 'Aa123456')
print(fb.is_logged_in())
print(fb.session.cookies)
id = 1337

a = 100069401490493