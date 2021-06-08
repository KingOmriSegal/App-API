from facebook_scraper import get_posts
import requests
import json
import base64
import re as regex
from multiprocessing import Pool


ID = 4


def main():
    facebook_accounts = filter(bool, [line.strip() for line in open("accounts.txt")])
    for facebook_account in facebook_accounts:
        crawl(facebook_account)


def crawl(facebook_account):
    for post in get_all_posts(facebook_account):
        print(post)
        # requests.post(f"{FILTERER_IP}/{ID}", data=post)


def get_all_posts(facebook_account: str):
    for post in get_posts(facebook_account, pages=100):
        yield {
            'content': post['text'],
            'username': facebook_account,
            'postDate': str(post['time']),
            'likes': post['likes'],
            'images': [process_image(image_url) for image_url in post['images']]
        }


def process_image(image_url):
    image = requests.get(image_url).content
    # image_filename = regex.search('([^/]+$)', image_url)
    # with open(f"~/scraped-images/{image_filename}", "wb") as image_file:
    #     image_file.write(image)

    encoded_image = base64.encodebytes(image).decode('utf-8')

    return encoded_image


if __name__ == '__main__':
    main()
