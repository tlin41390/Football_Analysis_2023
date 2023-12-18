import collections
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import json
from webdriver_manager.chrome import ChromeDriverManager

load_dotenv()


def get_stats(link, id):
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(link)
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    table = soup.find(id=id).find('tbody')

    return table


def process_text(table):
    player_list = []

    rows_in_table = table.find_all('tr')
    for row in rows_in_table:
        th_elem = row.find_all('th')
        td_elem = row.find_all('td')
        player_data = {}

        for th in th_elem:
            if th.text.isnumeric():
                player_data[td_elem[0].get_text()] = {}
                player_data[td_elem[0].get_text()]["Name"] = td_elem[0].get_text()
                for i in range(1, len(td_elem)):
                    value = td_elem[i].get_text()
                    player_data[td_elem[0].get_text()][td_elem[i].get('data-stat')] = value
                player_list.append(player_data)

    return player_list


def upload_db(data_list,collection):
    client = MongoClient(os.getenv('MONGO_URI'))
    db = client["local"]
    collection = db[collection]
    collection.insert_many(data_list)

    client.close()

def main():
    passing = get_stats("https://www.pro-football-reference.com/years/2023/passing.htm", "passing")
    rushing = get_stats("https://www.pro-football-reference.com/years/2023/rushing.htm","rushing")
    receiving = get_stats("https://www.pro-football-reference.com/years/2023/receiving.htm","receiving")

    passers = process_text(passing)
    rushers = process_text(rushing)
    print(rushers)
    receivers = process_text(receiving)

    upload_db(passers,"passing")
    upload_db(rushers,"rushing")
    upload_db(receivers,"receiving")


if __name__ == "__main__":
    main()
