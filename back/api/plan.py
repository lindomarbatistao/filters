import pandas as pd

# Carregar a planilha Excel
df = pd.read_excel("C:\\Users\\lintelecom\\Desktop\SENAI\\03 - PWBE\\04 - PBE 2DS\\06 - Exercício OS\\patrimonios.xlsx")

# Converter para JSON
json_data = df.to_json(orient="records", indent=4)

# Salvar em um arquivo
with open("dados.json", "w", encoding="utf-8") as file:
    file.write(json_data)

print("Arquivo JSON criado com sucesso!")
