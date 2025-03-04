# Savings - Api

API para controle de transações financeiras para controle pessoal.

Esta API foi desenvolvida usando typescript, utilizando ambiente Node com express.

## Rotas:

Na pasta `http` existem alguns arquivos que exemplificam o uso de algumas rotas.

## Arquitetura

Para essa API utilizei conceitos de arquitetura limpa e do padrão Ports and Adapters. Na pasta `core` estão concentrados os modelos, serviços de domínio e casos de uso referentes a usuários e transações.

Com uma arquitetura hexagonal (ou portas e adaptadores) permitimos que diversos clientes interajam com o nosso sistema em nível de igualdade. Quando um novo cliente surge, apenas é necessário adicionar um novo `adapter` para transformar os inputs do novo cliente em um formato que é compreendido pelo API interna da aplicação.

Uma outra grande vantagem da arquitetura hexagonal é que os adaptadores podem ser facilmente desenvolvidos orientados a testes. Toda aplicação e modelo de domínio pode ser testado antes mesmo de clientes e mecanismos externos tenham sido definidos.

## Tecnologias:

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-000?style=for-the-badge&logo=sqlite&logoColor=07405E)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## License

Distributed under the MIT License.

## Contato

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/felipe-jonathan/)](https://www.linkedin.com/in/felipe-jonathan/)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white&link=https://www.instagram.com/belipefarros/)](https://www.instagram.com/belipefarros/)

<!-- MARKDOWN LINKS & IMAGES -->
[react-native-badge]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[expo-badge]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[supabase-badge]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[react-query-badge]: https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white
