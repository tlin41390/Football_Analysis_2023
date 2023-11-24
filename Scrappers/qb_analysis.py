import collections

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import json

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
    player_dict = collections.defaultdict(dict)
    lines.pop(0)

    for l in lines:
        row = l.split(" ")[0:31]
        row[1:3] = [" ".join(row[1:3])]
        if row[1] == "Joshua Dobbs":
            row.insert(4,"QB")

        if row[1] == "Gardner Minshew":
            row[1:3] =[" ".join(row[1:3])]
        if row[0].isnumeric() and len(row) == 30 and row[1]!= "Taysom Hill":
            player_dict[row[1]] ={"Rate":float(row[23]),"Tm":row[2],
                                "Age":int(row[3]),
                                "Cmp":int(row[8]), "Att":int(row[9]),
                                "Cmp%":float(row[10]),"Yds":int(row[11]),
                                "TD":int(row[12]),"TD%":float(row[13]),
                                "Int":int(row[14]),"Int%":float(row[15]),"Sks":int(row[25])
                                }

    return player_dict


def main():
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=service, options=options)
    url = "https://www.pro-football-reference.com/years/2023/passing.htm"
    driver.get(url)

    table_id = "passing"
    table = driver.find_element("id",table_id)
    players = process_text(table.text)

    with open("../JSON_data/quarterbacks.json","w") as outfile:
        json.dump(players,outfile, indent = 2)


main()