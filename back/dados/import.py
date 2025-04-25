import pandas as pd
import os
import json
from django.core.management.base import BaseCommand
from ..api.models import Patrimonio

local = os.getcwd()

print(local)

# Carregando a planilha Excel
df = pd.read_excel(f"{local}\\patrimonios.xlsx")

# Processando e limpando os dados antes de gerar o JSON
dados_limpos = []

# Iterando sobre os registros e tratando os valores indesejáveis
for _, row in df.iterrows():
    # Convertendo a linha para um dicionário
    item = row.to_dict()

    # Tratando valores de 'ni' para garantir que não seja 0.0
    if item['ni'] == 0.0:
        item['ni'] = None  # ou algum outro valor que represente "não disponível"

    # Garantindo que todos os dados estejam presentes e válidos
    if item['ni'] and item['desc'] and item['loca']:
        dados_limpos.append(item)
    else:
        print(f"Item ignorado devido a dados faltando ou inválidos: {item}")

# Convertendo os dados limpos para JSON
json_data = json.dumps(dados_limpos, indent=4)

# Gravando o arquivo JSON
with open("dados.json", "w", encoding="utf-8") as file:
    file.write(json_data)

print("Arquivo JSON criado com sucesso!")

# Comando de importação para o Django
class Command(BaseCommand):
    help = 'Importa dados do arquivo JSON para a tabela Equipamento'

    def handle(self, *args, **kwargs):
        # Caminho relativo para o arquivo dados.json
        with open('dados.json', 'r') as f:
            dados = json.load(f)
        
        # Inserindo os dados no banco de dados
        for item in dados:
            try:
                # Criando um novo objeto Patrimonio
                Patrimonio.objects.create(
                    ni=item['ni'],
                    desc=item['desc'],
                    loca=item['loca']
                )
            except Exception as e:
                # Tratamento de erro caso ocorra algum problema com o item
                self.stdout.write(self.style.ERROR(f"Erro ao importar item {item}: {e}"))
        
        self.stdout.write(self.style.SUCCESS('Dados importados com sucesso!'))
