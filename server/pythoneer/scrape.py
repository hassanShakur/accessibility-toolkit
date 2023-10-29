from bs4 import BeautifulSoup as bs
import requests
import json
import sys
import time
import os


def scrape(url):
    data = get_image_links(url)
    return data


def get_image_links(url):
    page = requests.get(url)
    soup = bs(page.content, "html.parser")

    images = soup.findAll("img")
    img_data = [{"src": image["src"], "alt": image["alt"]} for image in images]

    save_to_json(img_data)

    return img_data


def save_to_json(data):
    path = os.path.join(os.getcwd(), "data")
    os.makedirs(path, exist_ok=True)
    with open(f"{path}/data.json", "w") as json_file:
        json.dump(data, json_file)


def log_details(url):
    path = os.path.join(os.getcwd(), "logs")
    os.makedirs(path, exist_ok=True)
    with open(f"{path}/log.txt", "a") as log:
        log.write(f"{time.ctime()} {url} {time.time() - start_time:.5f}\n")


if __name__ == "__main__":
    start_time = time.time()
    print("Scraping...")
    url = sys.argv[1]
    scrape(url)
    print(f"Scraped {url} in {time.time() - start_time:.5f} seconds.")
    log_details(url)
