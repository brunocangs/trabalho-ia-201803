# Trabalho

Para rodar o trabalho siga os seguintes passos

1. Tenha o Node instalado
2. De `cd` na pasta
3. Rode o comando `npm install`
4. Rode o comando `npm start`

**Recomendo usar uma IDE que suporte o plugin do ESLint, eu uso o VSCode**

Para criar um novo método, siga o template 

```javascript
import Method from './method';

export default class MetodoNovo extends Method {
    exec() {
        // Sobrescreva este método
    }
}
```

O arquivo `method` possui as funções de:

- isSolved

Recebe um estado (array) e retorna se ele é a solução

- arrayIsEqual

Compara dois vetores e retona `true` ou `false` sobre eles serem iguais

E o campo `stats` que retorna um objeto com as estatísticas do método. Só vai estar com os valores certos após rodar o `exec`