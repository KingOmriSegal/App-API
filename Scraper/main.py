from facebook_scraper import get_posts
import requests
import json
import base64

id = 4


def main():
    facebook_account = "joebiden"
    crawl(facebook_account)


def crawl(facebook_account):
    for post in get_all_posts(facebook_account):
        print(post)
        # requests.post(f"{FILTERER_IP}/{id}", data=post)


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
    encoded_image = base64.encodebytes(image).decode('utf-8')

    return encoded_image


if __name__ == '__main__':
    main()
