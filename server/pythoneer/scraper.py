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
            # self.color_contrast = self.extract_color_contrast()
            self.form_fields = self.extract_form_fields()

            self.data = {
                # "page_info": self.page_info,
                "page_structure": self.page_structure,
                # "links": self.links,
                # "images": self.images,
                # "heading_structure": self.heading_structure,
                # "color_contrast": self.color_contrast,
                # "form_fields": self.form_fields,
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

        # def extract_color_contrast(self):
        # Check color contrast based on WCAG 2.0
        sheet = cssutils.parseString(self.page.content)

        color_info = {}

        for rule in sheet:
            if rule.type == rule.STYLE_RULE:
                style = rule.style
                if style.getPropertyValue("color") and style.getPropertyValue(
                    "background-color"
                ):
                    color = style.getPropertyValue("color")
                    background_color = style.getPropertyValue("background-color")
                    color_info[color] = background_color

        # print(color_info)
        return color_info

    def extract_form_fields(self):
        # Extract form fields and their labels if any
        form_fields = self.soup.find_all("input")
        form_fields_dict = {}

        for field in form_fields:
            label = field.find_previous_sibling("label")
            if label:
                label_text = label.text
            else:
                label_text = ""

            form_fields_dict[field["name"]] = label_text

        return form_fields_dict

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
# scraper = Scraper("https://www.google.com")
