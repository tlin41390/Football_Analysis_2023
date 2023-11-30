import collections
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
from pymongo import MongoClient
import json
from webdriver_manager.chrome import ChromeDriverManager


def get_qb(link, id):
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(link)
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    table = soup.find(id=id).find('tbody')

    return table


def process_text(table):
    player_dict = collections.defaultdict(dict)
    rows_in_table = table.find_all('tr')
    for row in rows_in_table:
        th_elem = row.find_all('th')
        td_elem = row.find_all('td')
        for th in th_elem:
            if th.text.isnumeric():
                player_dict[td_elem[0].get_text()] = {}
                for i in range(1, len(td_elem)):
                    value = td_elem[i].get_text()
                    if value.isdecimal():
                        player_dict[td_elem[0].get_text()][td_elem[i].get('data-stat')] = float(value)
                    elif value.isnumeric():
                        player_dict[td_elem[0].get_text()][td_elem[i].get('data-stat')] = int(value)
                    else:
                        player_dict[td_elem[0].get_text()][td_elem[i].get('data-stat')] = value

    return player_dict


def main():
    table = get_qb("https://www.pro-football-reference.com/years/2023/passing.htm", "passing")
    players = process_text(table)
    print(players)


if __name__ == "__main__":
    main()
