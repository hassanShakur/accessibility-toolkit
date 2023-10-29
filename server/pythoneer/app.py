from bs4 import BeautifulSoup as bs
import requests
import json

url = "http://127.0.0.1:5500/index.html"


def get_image_links(url):
    page = requests.get(url)
    soup = bs(page.content, "html.parser")

    images = soup.findAll("img")
    img_data = [{"src": image["src"], "alt": image["alt"]} for image in images]

    save_to_json(img_data)

    return img_data


def save_to_json(data):
    with open("data.json", "w") as outfile:
        json.dump(data, outfile)


get_image_links(url)
