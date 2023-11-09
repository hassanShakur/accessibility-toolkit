from bs4 import BeautifulSoup as bs
import requests
import json
import sys
import time
import os


class Scraper:
    def __init__(self, url):
        try:
            self.page = requests.get(url)
            self.soup = bs(self.page.content, "html.parser")

            self.links = self.extract_links()
            self.images = self.extract_images()
            self.heading_structure = self.extract_heading_structure()

            self.data = {
                "links": self.links,
                "images": self.images,
                "heading_structure": self.heading_structure,
            }
            self.save_to_json(self.data)
        except Exception as e:
            print(e)
            return None

    def extract_links(self):
        links = [
            {"href": link["href"], "text": link.text}
            for link in self.soup.find_all("a")
        ]
        return links

    def extract_images(self):
        image_data = self.soup.find_all("img")
        images = []

        for image in image_data:
            image_src = image["src"]
            image_alt = image["alt"] if image.has_attr("alt") else ""
            images.append({"src": image_src, "alt": image_alt})

        return images

    def extract_heading_structure(self):
        body = self.soup.find("body")
        block_elements = [
            "article",
            "aside",
            "div",
            "footer",
            "form",
            "header",
            "li",
            "main",
            "nav",
            "ol",
            "p",
            "pre",
            "section",
            "table",
            "ul",
        ]
        elements_headings_dict = {}

        for element in block_elements:
            element_instances = body.findChildren(element, recursive=True)
            element_headings_dict = {}

            for i, instance in enumerate(element_instances):
                headings = instance.findChildren(
                    ["h1", "h2", "h3", "h4", "h5", "h6"], recursive=False
                )
                heading_levels = [int(heading.name[1]) for heading in headings]

                element_headings_dict[f"{element}_{i+1}"] = heading_levels

                # if len(heading_levels) > 1:
                #     for j in range(len(heading_levels) - 1):
                #         if heading_levels[j + 1] - heading_levels[j] > 1:
                #             print(
                #                 f"Warning: Heading structure in {element}_{i+1} does not follow the recommended structure. Jump from h{heading_levels[j]} to h{heading_levels[j + 1]}."
                #             )

            elements_headings_dict[element] = element_headings_dict

        return elements_headings_dict

    def save_to_json(self, data):
        path = self.build_file_path("data")
        with open(f"{path}/data.json", "w") as json_file:
            json.dump(data, json_file)

    def log_details(self, url):
        path = self.build_file_path("logs")
        with open(f"{path}/log.txt", "a") as log:
            log.write(f"{time.ctime()} {url} {time.time() - start_time:.5f}\n")

    def build_file_path(self, dir):
        path = os.path.join(os.getcwd(), "pythoneer", dir)
        os.makedirs(path, exist_ok=True)
        return path


if __name__ == "__main__":
    start_time = time.time()
    print("Scraping...")
    url = sys.argv[1]
    scraper = Scraper(url)
    print(f"Scraped {url} in {time.time() - start_time:.5f} seconds.")
    scraper.log_details(url)
