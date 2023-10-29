from bs4 import BeautifulSoup as bs
import requests
import json

url = "http://127.0.0.1:5500/index.html"


# function to get all image links and alt text from a webpage
def get_image_links(url):
    page = requests.get(url)
    soup = bs(page.content, "html.parser")

    images = soup.findAll("img")
    objs = []

    for image in images:
        objs.append({"src": image["src"], "alt": image["alt"]})

    # Save to json file
    save_to_json(objs)

    return objs


# function to save data to json file
def save_to_json(data):
    with open("data.json", "w") as outfile:
        json.dump(data, outfile)

get_image_links(url)
