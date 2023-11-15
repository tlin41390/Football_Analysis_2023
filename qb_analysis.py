import collections

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# def scrape_site(link,id):
#     service = Service(ChromeDriverManager().install())
#     options = webdriver.ChromeOptions()
#     driver = webdriver.Chrome(service=service, options=options)
#     driver.get(link)
#     table = driver.find_element("id", id)
#     return table.text
#


def process_text(text):
    lines = text.split('\n')
    full_data = []
    stats = lines[0]
    player_dict = collections.defaultdict(dict)
    lines.pop(0)

    for l in lines:
        row = l.split(" ")
        row[1:3] = [" ".join(row[1:3])]
        print(row)
        if len(row) == 31:
            for i in range(len(stats) - 2):
                if i != 1 and row[0].isnumeric():
                    player_dict[row[1]][stats[i]] = row[i]

    return

def process_players(players):
    player_dict = collections.defaultdict(dict)
def main():
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=service, options=options)
    url = "https://www.pro-football-reference.com/years/2023/passing.htm"
    driver.get(url)

    table_id = "passing"
    table = driver.find_element("id",table_id)
    process_text(table.text)


main()