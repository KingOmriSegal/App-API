from facebook_scraper import get_posts
import requests
import json
import base64
import re as regex
from multiprocessing import Pool
import os

ID = 4


def main():
    facebook_accounts = list(filter(bool, [line.strip() for line in open("accounts.txt")]))
    with Pool(min(len(facebook_accounts), 10)) as pool:
        pool.map(crawl, facebook_accounts)


def crawl(facebook_account):
    for post in get_all_posts(facebook_account):
        # requests.post(API, json=post)
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
    try:
        image = requests.get(image_url).content
        save_image(image, "scraped-images")
        encoded_image = base64.encodebytes(image).decode('utf-8')

        return encoded_image
    except Exception as e:
        print(e)
        raise e


def call_counter(func):
    call_count = 0

    def inner(*args, **kwargs):
        nonlocal call_count
        call_count += 1
        return func(call_count, *args, **kwargs)
    return inner


@call_counter
def save_image(call_count, image_content, directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(f"{directory}\\img{call_count}.png", "wb") as image_file:
        image_file.write(image_content)


if __name__ == '__main__':
    main()
