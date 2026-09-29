# JR Webshop V2

Een schone Shopify-theme voor de nieuwe JR Intelligence-webshop.

## Belangrijk

- De oude webshop staat veilig op `main` in de bestaande repository.
- V2 staat los op de branch `cursor/jrwebshop-v2-a69a`.
- Er is bewust geen automatische live-deploy ingesteld.
- Werk eerst met een niet-gepubliceerde Shopify-theme.

## Samenwerken

Maak voor ieder onderdeel een eigen branch:

- `homepage/banner`
- `homepage/volgende-sectie`
- `diensten/eerste-sectie`

Open daarna een pull request naar de V2-hoofdbranch. Zo werken twee mensen niet tegelijk in dezelfde bestanden.

## Theme lokaal controleren

```bash
shopify theme dev --path shopify-theme --store 80ef9z-cr.myshopify.com
```

## Veilige eerste upload

Maak altijd een nieuwe, niet-gepubliceerde theme:

```bash
shopify theme push --unpublished --path shopify-theme --store 80ef9z-cr.myshopify.com
```

Publiceer de theme pas in Shopify wanneer de volledige webshop klaar is.
