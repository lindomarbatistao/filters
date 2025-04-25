from django.db import models

class Patrimonio(models.Model):
    ni = models.DecimalField(max_digits=10, decimal_places=0)  # ou IntegerField dependendo da necessidade
    desc = models.TextField()  # Descrição
    loca = models.IntegerField()  # Localização

    def __str__(self):
        return self.desc
 
    

