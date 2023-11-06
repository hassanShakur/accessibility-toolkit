from bs4 import BeautifulSoup as bs
import requests
import json
import sys
import time
import os


def scrape(url):
    try:
        page = requests.get(url)
        soup = bs(page.content, "html.parser")

        links = extract_links(soup)
        images = extract_images(soup)

        data = {"links": links, "images": images}
        save_to_json(data)
    except Exception as e:
        print(e)
        return None


def extract_links(soup):
    links = [{"href": link["href"], "text": link.text} for link in soup.find_all("a")]
    return links


def extract_images(soup):
    image_data = soup.find_all("img")
    images = []

    for image in image_data:
        image_src = image["src"]
        image_alt = image["alt"] if image.has_attr("alt") else ""
        images.append({"src": image_src, "alt": image_alt})

    return images
    


def save_to_json(data):
    path = build_file_path("data")
    with open(f"{path}/data.json", "w") as json_file:
        json.dump(data, json_file)


def log_details(url):
    path = build_file_path("logs")
    with open(f"{path}/log.txt", "a") as log:
        log.write(f"{time.ctime()} {url} {time.time() - start_time:.5f}\n")


def build_file_path(dir):
    path = os.path.join(os.getcwd(), "pythoneer", dir)
    os.makedirs(path, exist_ok=True)
    return path


if __name__ == "__main__":
    start_time = time.time()
    print("Scraping...")
    url = sys.argv[1]
    scrape(url)
    print(f"Scraped {url} in {time.time() - start_time:.5f} seconds.")
    log_details(url)
# scrape("https://mmu.ac.ke/")
