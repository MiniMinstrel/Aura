import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import scipy.stats as stats
import io
from PIL import Image


def createTrendSet(trend_data, select_year):
    df1 = pd.DataFrame(trend_data, columns = ['Date', 'Trait'])
    df2 = pd.DataFrame({['Year', 'Month'] : df1['Date'].str.split('-').tolist(), 'Trait' : df1['Trait']}, 
                       columns = ['Year', 'Month', 'Trait'])
    df2 = df2[df2['Year'] == select_year]
    year_average_trait = df2['Trait'].mean()

    return df2, year_average_trait

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

def plotTrendSetsTogether(trend_data_1, trend_data_2, trait_name, select_year):
    trend_set_1, year_average_1 = createTrendSet(trend_data_1, select_year)
    trend_set_2, year_average_2 = createTrendSet(trend_data_2, select_year)

    image_plt = plotTrendSets(trend_set_1, trend_set_2, trait_name, select_year)

    return image_plt, year_average_1, year_average_2

def yearAverageDifference(year_average_1, year_average_2, trait_name):
    difference = np.abs(year_average_1 - year_average_2)

    strings = ["Yearly Averages",
                "Category #1 " + trait_name + " Avg: " + str(year_average_1),
                "Category #2 " + trait_name + " Avg: " + str(year_average_2),
                "An approximate " + str(difference) + " difference"]
    
    return strings 

def monthAverageDifference(trend_set_1, trend_set_2, trait_name, select_month):
    difference = abs(trend_set_1.loc[trend_set_1['Month'] == select_month, 'Trait'].iloc[0] - 
                     trend_set_2.loc[trend_set_2['Month'] == select_month, 'Trait'].iloc[0])

    strings = ["Monthly Averages",
                "Category #1 " + trait_name + " Avg: " + str(trend_set_1.iloc[trend_set_1.columns[0] == select_month][1]),
                "Category #2 " + trait_name + " Avg: " + str(trend_set_2.iloc[trend_set_2.columns[0] == select_month][1]),
                "An approximate " + str(difference) + " difference"]
    
    return strings

def collectFinalStats(trend_data_1, trend_data_2, trait_name, select_year, select_month):
    image_plt, year_average_1, year_average_2 = plotTrendSetsTogether(trend_data_1, trend_data_2, trait_name, select_year)
    year_difference_strings = yearAverageDifference(year_average_1, year_average_2, trait_name)
    trend_set_1, year_average_1 = createTrendSet(trend_data_1, select_year)
    trend_set_2, year_average_2 = createTrendSet(trend_data_2, select_year)
    month_difference_strings = monthAverageDifference(trend_set_1, trend_set_2, trait_name, select_month)

    return image_plt, year_difference_strings, month_difference_strings