# Generated by Django 4.1.7 on 2023-03-12 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productapp', '0007_alter_bird_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bird',
            name='image',
            field=models.ImageField(default='https://res.cloudinary.com/djkpvbgmj/image/upload/v1678641205/media/fog/birds/pol1_twqujq.jpg', upload_to='fog/birds/'),
        ),
    ]
