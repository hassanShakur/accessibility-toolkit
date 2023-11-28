from bs4 import BeautifulSoup as bs
import requests
import json
import sys
import time
import os
import traceback


class WebScraper:
    def __init__(self, url):
        try:
            # Fetch the web page and create a BeautifulSoup object
            self.page = requests.get(url)
            self.soup = bs(self.page.content, "html.parser")

            # Initialize data containers
            self.page_info = {}
            self.page_structure = {}
            self.links = {}
            self.images = {}
            self.heading_structure = {}
            self.form_fields = {}

            self.data = {}
            self.error = None

            # Extract data from the web page
            self.execute_data_extractors()
            print(json.dumps({"data": self.data}))

        except Exception as e:
            # Handle exceptions and provide details for debugging
            # print(f"Error: {e}")
            # traceback.print_exc()
            self.error = {"type": type(e).__name__, "message": str(e)}
            print(json.dumps({"error": self.error}))

    def execute_data_extractors(self):
        # Extract information using various methods
        self.page_info = self.extract_page_info()
        self.page_structure = self.extract_page_structure()
        self.links = self.extract_links()
        self.images = self.extract_images()
        self.heading_structure = self.extract_heading_structure()
        self.form_fields = self.extract_form_fields()

        # Organize extracted data into a dictionary
        self.data = {
            "page_info": self.page_info,
            "page_structure": self.page_structure,
            "links": self.links,
            "images": self.images,
            "heading_structure": self.heading_structure,
            "form_fields": self.form_fields,
        }

        # Save the extracted data to a JSON file
        self.save_to_json(self.data)

    def extract_page_info(self):
        # Extract meta information about the web page
        page_info = {
            "title": self.soup.title.string,
            "language": self.soup.find("html").get("lang", ""),
        }

        meta_tags = ["description", "keywords", "author", "viewport"]
        for tag in meta_tags:
            tag_data = self.soup.find("meta", attrs={"name": tag})
            if tag_data:
                page_info[tag] = tag_data.get("content", "")

        return page_info

    def extract_page_structure(self):
        # Check for the presence of structural elements on the web page
        page_structure = {}
        structure_elements = ["header", "footer", "nav", "main"]
        for element in structure_elements:
            page_structure[element] = self.soup.find(element) is not None

        return page_structure

    def extract_links(self):
        # Extract links and their text from anchor tags
        links = [
            {"href": link.get("href", ""), "text": link.text.strip()}
            for link in self.soup.find_all("a")
        ]
        return links

    def extract_images(self):
        # Extract image sources and alt text
        images = [
            {
                "src": image.get("src", ""),
                "alt": image.get("alt", ""),
            }
            for image in self.soup.find_all("img")
        ]
        return images

    def extract_heading_structure(self):
        # Extract heading structure within various block elements
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
            element_instances = body.find_all(element, recursive=True)
            element_headings_arr = []

            for instance in element_instances:
                headings = instance.find_all(
                    ["h1", "h2", "h3", "h4", "h5", "h6"], recursive=False
                )
                heading_levels = [int(heading.name[1]) for heading in headings]

                element_headings_arr.append(heading_levels)

            elements_headings_dict[element] = element_headings_arr

        return elements_headings_dict

    def extract_form_fields(self):
        # Extract form fields and associated information
        form_fields = self.soup.find_all("input")
        form_fields_arr = []

        for field in form_fields:
            label = field.find_previous_sibling("label")
            label_text = label.text if label else ""
            field_name = field.get("name") or field.get("id") or field.get("type", "")

            form_fields_arr.append(
                {
                    "name": field_name,
                    "label": label_text,
                    "type": field.get("type", ""),
                }
            )

        return form_fields_arr

    def save_to_json(self, data):
        # Save data to a JSON file
        path = self.build_file_path("data")
        with open(f"{path}/data.json", "w") as json_file:
            json.dump(data, json_file)

    def log_details(self, url, start_time):
        # Log details including URL and execution time
        path = self.build_file_path("logs")
        with open(f"{path}/log.txt", "a") as log:
            log.write(f"{time.ctime()} {url} {time.time() - start_time:.5f}\n")

    def build_file_path(self, directory):
        # Build a file path for data and logs
        path = os.path.join(os.getcwd(), "pythoneer", directory)
        os.makedirs(path, exist_ok=True)
        return path


if __name__ == "__main__":
    # Check if a URL is provided as a command line argument
    if len(sys.argv) < 2:
        print("Please provide a URL as a command line argument.")
        sys.exit(1)

    start_time = time.time()
    url = sys.argv[1]
    # Initialize the WebScraper and perform data extraction
    scraper = WebScraper(url)
    # Log details including URL and execution time
    scraper.log_details(url, start_time)
