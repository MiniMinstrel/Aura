import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import scipy.stats as stats
import io
from PIL import Image


def createTrendSet(trait_data, month_data, year_data, select_year):
    df = pd.DataFrame([month_data, year_data, trait_data], columns = ['Month', 'Year', 'Trait'])
    df = df[df['Year'] == select_year]
    year_average_trait = df['Trait'].mean()
    df = df.groupby(['Month'])['Trait'].mean()

    return df, year_average_trait

def plotTrendSets(trend_set_1, trend_set_2, trait_name, select_year):
    plt.figure(figsize = (10, 5))
    plt.plot(trend_set_1, color = 'blue', label = trait_name + ' #1')
    plt.plot(trend_set_2, color = 'red', label = trait_name + ' #2')
    plt.xlabel('Month')
    plt.ylabel(trait_name)
    plt.title(trait_name + ' trends for ' + str(select_year))
    plt.legend()
    plt.show()

    image_plt = io.BytesIO()
    plt.savefig(image_plt, format='png')

    return image_plt

def plotTrendSetsTogether(trait_data_1, month_data_1, year_data_1, trait_data_2, month_data_2, year_data_2, trait_name, select_year):
    trend_set_1, year_average_1 = createTrendSet(trait_data_1, month_data_1, year_data_1, select_year)
    trend_set_2, year_average_2 = createTrendSet(trait_data_2, month_data_2, year_data_2, select_year)

    image_plt = plotTrendSets(trend_set_1, trend_set_2, trait_name, select_year)

    return image_plt, trend_set_1, trend_set_2, year_average_1, year_average_2

def yearAverageDifference(year_average_1, year_average_2, trait_name):
    difference = np.abs(year_average_1 - year_average_2)

    strings = ["Yearly Averages",
                "Category #1 " + trait_name + " Avg: " + str(year_average_1),
                "Category #2 " + trait_name + " Avg: " + str(year_average_2),
                "An approximate " + str(difference) + " difference"]
    
    return strings 

def monthAverageDifference(trend_set_1, trend_set_2, trait_name, select_month):
    difference = abs(trend_set_1.iloc[trend_set_1.columns[0] == select_month][1] - trend_set_2.iloc[trend_set_2.columns[0] == select_month][1])

    strings = ["Monthly Averages",
                "Category #1 " + trait_name + " Avg: " + str(trend_set_1.iloc[trend_set_1.columns[0] == select_month][1]),
                "Category #2 " + trait_name + " Avg: " + str(trend_set_2.iloc[trend_set_2.columns[0] == select_month][1]),
                "An approximate " + str(difference) + " difference"]
    
    return strings

