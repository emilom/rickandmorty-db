# Project 4

## Kjøre prosjektet

* Klon eller last ned prosjektet

Åpne en terminal og naviger til  *project-4/native-app*

For å installere kjører du 
    
    npm install

og (om du ikke har Expo CLI fra før av)

    npm install --global expo-cli

For å starte prosjektet kjører du:

    expo start

Bentytt [expo-client](https://expo.io/) på mobilen, scan deretter QR-koden som vises i nettleseren eller benytt iOS / Andorid emulator for å teste ut appen.

## Om applikasjonen
Vi har valgt Alternativ A) React Native klient.

Vi har valgt å lage en app som baserer seg på samme data som ble benyttet i [prosjekt 3](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-11/project-3). Der man har mulighet til å søke blant alle karakterene i tegneserien Rick and Morty.

I prosjekt 3 laget vi vår egen backend basert på et offentlig [API](https://rickandmortyapi.com/), slik at vi kunne legge til egne metoder og felter. Av simplisitetsgrunner har vi for prosjekt 4 valgt å bruke API'et direkte. API'et vi benytter i prosjekt 4 har liknende funksjonalitet som det vi satt opp selv i prosjekt 3. Dette gjorde at å f.eks. implementere søk og filtrering ble svært likt og det var mye kode vi kunne gjenbruke fra prosjekt 3. Det samme gjelder bruken av Apollo. Vi anså det som relativt trygt å bruke dette API'et direkte, ettersom API'et ikke har hatt noe nedetid de siste 6 månende, som man kan se [her](https://status.rickandmortyapi.com/).

**NB:**
Det sto ingen ting om VM under læringsmålene, krav til applikasjonens innhold og funksjonalitet eller krav til bruk av teknologi, koding, testing, dokumentasjon, levering etc.
Vi tolket dette kombinert med “Det er ikke noe eksplisitt krav at dere skal jobbe med egen backend fra prosjekt 3, og greit å avtale med andre om bruk av deres backend hvis dere finner det hensiktsmessig.“ som at vi kunne bruke et eksternt API. Det var ikke før vi skulle levere prosjektet vi så minstekravet om database under “Prosjekt 4 innlevering og medstudentvurdering“ og det ville da tatt for mye tid å skrive om prosjektet til å fungere med databasen vår fra prosjekt 3.


## Teknologi
Prosjektet er bygget i React Native og er implementert i Typescript.
Vi har brukt Expo for å initialisere prosjektet.
For de ulike komponentene har vi primært laget funksjonelle komponenter med State Hooks, i **ListItem.tsx** har vi benyttet class.

For UI komponenter har vi benyttet kjernekomponentene i React Native samt biblotekene [React Native Elements](https://reactnativeelements.com/) og [React Native Paper](https://callstack.github.io/react-native-paper/index.html). For å velge mellom de ulike filtrene har vi benyttet Picker komponenten [react-native-picker-select](https://www.npmjs.com/package/react-native-picker-select)

I klienten har vi benyttet oss av [Appollo Client](https://www.apollographql.com/docs/react/). Apollo lar oss hente og cache data fra API'et. I **App.tsx** instansieres et Apollo Client objekt med uri til API'et. Ved å bruke ApolloProvider har hele applikasjonen tilgang til API'et. Dett lar oss enkelt skrive graphQL queries i de ulike komponentene. Ved å bruke apollo sin cache blir også siden mer effektiv. Dette kan man merke ved å vise inn mer detaljer om samme karakter flere ganger, da dataen kun trenger å lastes inn første gang.

### Manuell end-2-end testing
Appen har blitt manuelt end-2-end testet ved å gjennomføre typiske brukscenariorer. Dette innebærer å søke, filtrere, scrolle opp og ned, og å trykke på de ulike resultatene og få opp en detaljert visning av en karakter.

Disse end-2-end testene ble utført både på Android og IOS for å forsikre oss om at appen fungerte som den skal på begge operativsystemer. Dette var spesielt nyttig i utviklingen av appens design, ettersom det var noen små forskjeller utifra hvilket operativsystem appen kjørte på.

Underveis i utviklingen har vi benyttet oss av Expo appen for iOS og Android samt emulatorer.

## Innhold og funksjonalitet
Appen er designet med samme utgangspunkt som vi satte for prosjekt 3, hvor vi ville at brukeren skulle få en visuell fremstilling av resultatlisten ved hjelp av bilder. Hvert element i resultatlisten har altså et bilde av karakteren som hovedfokus, hvor man kan trykke seg inn på elementet i resultatlisten for å få mer informasjon om karakteren. 

Vi har vært bevisste om at vi utvikler en mobilapplikasjon når det kommer til designet, og har derfor forsøkt å holde appen så overisktlig og ukomplisert som mulig. I tillegg har ytelse vært i fokus under utviklingsprosessen, hvor vi har forsøkt å gjøre applikasjonen rask og responsiv ved bruk av appens funksjonalitet.
### Søkegrensesnitt
Søk gjøres via et søkefelt, der man søker blant navnet på alle karakterene i API'et. Appen søker hver gang du endrer noe i søkefeltet, det samme gjelder når du bytter hva slags filter som gjelder. Dette har vi gjort for å forbedre brukeropplevelsen og skape mer flyt ved bruk av applikasjonen. Vi benyttet oss av Searchbar komponentet til react-native-paper. Inputen i søkefeltet lagres som state med useState, og blir bruk i child komponentet characters til å hente data fra API'et.

### Resultatsett
Resultatsettet lastes dynamisk ved scrolling. Vi har benyttet oss av [FlatList](https://reactnative.dev/docs/flatlist) for å vise resultatet. Det lastes inn 20 objekter om gangen. Ved å bruke FlatList's onEndReached prop laster vi inn 20 nye obketer, og legger de til resultatsettet når man scroller til bunnen av siden. Hvert item i FlatListen er representert med et egent komponent **ListItem.tsx**. 

**ListItem.tsx** rendrer bilde og tekst, og benytter seg av metoden shouldComponentUpdate som returnerer false. Dette er best practise som beskrevet [her](https://reactnative.dev/docs/optimizing-flatlist-configuration). Dette gjør at man slipper å re-rendre hele resultatsettet på nytt hver gang det lastes inn mer ved scrolling, og gir bedre ytelse. Vi benytter oss også av removeClippedSubviews propen. Dette kan også bedre ytelse som beskrevet i doumentasjonen til react-native: "views that are outside of the viewport are detached from the native view hierarchy. This reduces time spent on the main thread, and thus reduces the risk of dropped frames, by excluding views outside of the viewport from the native rendering and drawing traversals." [Docs](https://reactnative.dev/docs/optimizing-flatlist-configuration#removeclippedsubviews). Til slutt har vi unngptt å bruke en anonym funksjon til renderItem, og heller plasser funksjonen utenfor render funksjonen. Da unngår vi at funskjonen må gjenskapes hver gang.

Før vi implementerte disse 
konfigurasjonene opplevde vi at applikasjonen var svært treig da vi gjennomførte ende til ende tester, særlig når man allerede hadde lastet inn større mengder data. Dette gjalt spessielt hver gang man lastet inn mer data ved scorlling, eller ønsket å se fler detaljer. Vi merket stor forskjell på ytelse etter å ha implementert konfigurasjonene som beskrevet i react native [documentasjonen](https://reactnative.dev/docs/optimizing-flatlist-configuration#removeclippedsubviews)

### Detaljert visning
For hvert søkeresultat kan man trykke på resultaet, og med det få opp en detaljert visning. Her får man mer informasjon om hver karakter, og man kan også se en liste over alle episodene som denne karakteren har hvert med i. Denne informasjonen blir hentet basert på ID'en til karakteren man trykker på. Ved å kun hente denne dataen når man viser mer detaljer slipper vi å laste inn like mye data i FlatListen. 

### Raffinere søkeresultatet
For å raffinere søkeresultatet kan man filtrere på gender, status (alive, dead, unknown) og species. Alle søke og filtreringsparameterene kan tilbakestilles med en reset-knapp. 

#### Sortering
Vi har valgt å ikke implementere sortering. Grunnen for dette er at API-et vi benytter nå ikke har denne funksjonaliteten innebygd, i prosjekt-3 lagde vi et eget API/backend basert på det API-et som vi nå benytter, og kunne derfor lage egne funksjoner for å sortere. For å unngå å måtte starte/hoste backend lokalt og benytte VPN for å koble seg mot VM så har vi vurdert det som bedre for helhetens skyld å ikke ha sortering, og at det i dette prosjektet var viktigere å fokusere på utvikling i React Native istedenfor å måtte gjenta det vi gjorde i prosjekt 3.

 Å håndtere sortering i frontend er heller ingen god løsning fordi vi dette ville kreve at hele resultatsettet er lastet inn, som går utover applikasjonens ytelse som heller ikke er ønskelig.