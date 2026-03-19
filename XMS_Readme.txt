Voilà un projet généré avec github copilot en 5h : 
- 1 frontend servi par un serveur asp.net qui écoute sur le port 5000
- 1 backend servi par un serveur asp.net qui écoute sur le port 5000

curl -v -X POST http://localhost:5000/Book -H "Content-Type: application/json" -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\"}"

curl -v http://localhost:5000/Book/all