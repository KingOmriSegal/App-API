from facebook_scraper import get_posts
import requests
import json
import base64
import re as regex
from multiprocessing import Pool
import os

ID = 4
API = "http://writing-api-intelscraping2.apps.openforce.openforce.biz"

def main():
    facebook_accounts = list(filter(bool, [line.strip() for line in open("accounts.txt")]))
    # for account in facebook_accounts:
    #     crawl(account)
    with Pool(min(len(facebook_accounts), 10)) as pool:
        pool.map(crawl, facebook_accounts)


def crawl(facebook_account):
    for post in get_all_posts(facebook_account):
        requests.post(API, data=post)
        print(post)


def get_all_posts(facebook_account: str):
    for post in get_posts(facebook_account, pages=100):
        yield {
            'content': post['text'],
            'username': facebook_account,
            'postDate': str(post['time']),
            'likes': post['likes'],
            # 'images': [process_image(image_url) for image_url in post['images']]
        }


def process_image(image_url):
    image = requests.get(image_url).content
    save_image(image, "scraped-images")
    encoded_image = base64.encodebytes(image).decode('utf-8')

    return encoded_image


def call_counter():
    info = {"count": 1}

    def save_image_inner(image_content, directory):
        if not os.path.exists(directory):
            os.makedirs(directory)

        with open(f"{directory}\\shellcode{info['count']}.png", "wb") as image_file:
            image_file.write(image_content)
        info["count"] += 1

    return save_image_inner


save_image = call_counter()


if __name__ == '__main__':
    main()
