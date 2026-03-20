Voilà un projet généré avec github copilot en 5h : 
- 1 frontend servi par un serveur asp.net qui écoute sur le port 5000
- 1 backend servi par un serveur asp.net qui écoute sur le port 5000

curl -v -X POST http://localhost:5000/Book -H "Content-Type: application/json" -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\"}"

curl -v http://localhost:5000/Book/all



Pour publier un exe pour windows : (attention il y en plein d'options)

Option 1 : self-contained ; 

    dotnet publish .\MyFirstSinglePageAppProject.csproj -c Release -r win-x64 --self-contained true

    Il faut comprendre qu'avec self-contained l'exe se servira/copiera de la version dotnet avec laquelle on a buildé et testé en local (en l'occurence TargetFramework = net10.0 pour mon projet)
    - Le fichier <nomProjet>.exe est un juste lanceur 
    - l'app est dans le fichier <nomProjet>.dll du même nom que l'app, 
    - les fichiers (notamment les dll) du runtime .net  dans le même dossier publish que l'exe ; elle seront peut être nécessaires à l'exécution

Option 2 : self-contained mais tout dans un single file

    dotnet publish .\MyFirstSinglePageAppProject.csproj -c Release -r win-x64 --self-contained true /p:PublishSingleFile=true

Option 3 : pas self-contained, donc framework dependant (Nécessite le runtime .NET installé sur la machine)
