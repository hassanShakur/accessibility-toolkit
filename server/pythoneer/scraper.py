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

            self.page_info = self.extract_page_info()
            self.page_structure = self.extract_page_structure()
            self.links = self.extract_links()
            self.images = self.extract_images()
            self.heading_structure = self.extract_heading_structure()
            self.form_fields = self.extract_form_fields()

            self.data = {
                "page_info": self.page_info,
                "page_structure": self.page_structure,
                "links": self.links,
                "images": self.images,
                "heading_structure": self.heading_structure,
                "form_fields": self.form_fields,
            }
            self.save_to_json(self.data)
        except Exception as e:
            print(f"Error: {e}")
            self.error = e
            return None

    def extract_page_info(self):
        page_info = {}
        page_info["title"] = self.soup.title.string

        meta_tags = ["description", "keywords", "author", "viewport"]
        for tag in meta_tags:
            tag_data = self.soup.find("meta", attrs={"name": tag})
            if tag_data:
                page_info[tag] = tag_data["content"]

        page_info["language"] = self.soup.find("html")["lang"]

        return page_info

    def extract_page_structure(self):
        page_structure = {}
        structure_elements = ["header", "footer", "nav", "main"]
        for element in structure_elements:
            page_structure[element] = self.soup.find(element) != None

        return page_structure

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
            element_headings_arr = []

            for i, instance in enumerate(element_instances):
                headings = instance.findChildren(
                    ["h1", "h2", "h3", "h4", "h5", "h6"], recursive=False
                )
                heading_levels = [int(heading.name[1]) for heading in headings]

                element_headings_arr.append(heading_levels)

            elements_headings_dict[element] = element_headings_arr

        return elements_headings_dict

    def extract_form_fields(self):
        form_fields = self.soup.find_all("input")
        form_fields_arr = []

        for field in form_fields:
            label = field.find_previous_sibling("label")
            if label:
                label_text = label.text
            else:
                label_text = ""

            if field.has_attr("name"):
                form_fields_arr.append(
                    {"name": field["name"], "label": label_text, "type": field["type"] if field.has_attr("type") else ""}
                )
            elif field.has_attr("id"):
                form_fields_arr.append(
                    {"name": field["id"], "label": label_text, "type": field["type"] if field.has_attr("type") else ""}
                )
            else:
                form_fields_arr.append(
                    {"name": field["type"], "label": label_text, "type": field["type"] if field.has_attr("type") else ""}
                )

        return form_fields_arr

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
