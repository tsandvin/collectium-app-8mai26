# Deploy trigger — startside v30

Denne filen er kun lagt inn for å trigge ny Vercel-build etter at manglende filer ble lagt inn.

## Årsak

Vercel bygget tidligere fra gammel commit:

```txt
95a341b
```

Den commiten manglet:

```txt
components/startside/CollectiumStartContent.tsx
components/templates/CollectiumStartTemplate.module.css
```

Begge filene finnes nå på `main`.

## Riktig handling

Vercel skal bygge siste commit på `main`, ikke `95a341b`.
