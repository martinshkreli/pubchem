import pubchempy as pcp

df2 = pcp.get_compounds(list(range(1,501)), as_dataframe=True)

d = df2.loc[:,"RecordTitle"]

d.to_csv("output501.csv")