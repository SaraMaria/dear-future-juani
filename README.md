# Dear Future Juani

Um site pessoal, interativo e emocional para o Juani: uma portada com espaço para vídeo, um painel com cartas para o futuro, rituais para viver o presente, perguntas de reflexão, um mapa emocional da viagem, uma playlist e um arquivo restrito. Feito só com HTML, CSS e JavaScript puro — sem backend, sem build, sem servidor próprio.

## Estrutura de arquivos

```
index.html
style.css
script.js
README.md
images/
  └── archivo-restringido.png   (foto no fim do Archivo Restringido)
audio/
  └── panel-tema.mp3            (música que toca no painel principal)
video/                          (pasta vazia — veja "Portada e vídeo" abaixo)
```

Todos esses arquivos e pastas precisam ir juntos para o GitHub Pages — se faltar a pasta `images/` ou `audio/`, a foto ou a música não vão aparecer/tocar no site publicado.

## Como abrir localmente

Basta abrir `index.html` em qualquer navegador. Funciona offline (exceto pelo carregamento das fontes do Google Fonts, que é opcional e tem *fallback* para fontes do sistema).

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado, se preferir).
2. Suba **todos** os arquivos e pastas listados acima para a raiz do repositório — incluindo as pastas `images/`, `audio/` e `video/` inteiras, não só o `index.html`.
   - Pelo site do GitHub: botão **Add file → Upload files**, arraste tudo (inclusive as pastas) e confirme o commit.
   - Ou por linha de comando:
     ```
     git init
     git add .
     git commit -m "primeira versão do site"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
     git push -u origin main
     ```
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
5. Salve. Em alguns minutos o site estará disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Se o repositório for público, qualquer pessoa com o link pode acessar — pense nisso se forem escritas coisas pessoais nas cartas pré-configuradas ou nas fotos.

## Como personalizar

Tudo o que normalmente precisaria mexer está reunido no topo do arquivo `script.js`, na seção `CONFIG`:

```js
const traveler = {
  name: "Juani",             // único usuário do site
  origin: "Argentina",
  destination: "Europa",
  departureDate: "2026-08-15"   // formato AAAA-MM-DD — data real da partida
};
```

- `traveler.departureDate` é usada para calcular toda a linha do tempo de cartas.
- As cartas que você escreveu e que vão chegar por e-mail estão em `emailLetters`.
- As datas sugeridas para o Juani escrever pra si mesmo estão em `selfLetterPresets`.
- Os rituais estão no array `rituals`, organizados por categoria (`comer`, `explorar`, `sentir`, `memorias`) — dá para adicionar novos rituais copiando o formato de um existente.
- As perguntas aleatórias estão em `randomQuestions`.
- O backup na nuvem é configurado em `cloudSync` (veja a seção "Backup na nuvem" abaixo).

Não é necessário editar `index.html` ou `style.css` para trocar textos — só o `script.js` (com exceção da portada e do arquivo restrito, que têm textos fixos direto no `index.html`, já que são conteúdo único do presente).

## Portada e vídeo

A primeira tela do site (antes do painel) mostra o texto "De Sarang do presente, para" e, logo abaixo, o vídeo `video/intro.mp4` — já adicionado, com os controles padrão do navegador (play, pausa, volume, tela cheia). O arquivo foi comprimido (de ~53MB para ~19MB) para caber nos limites de upload do GitHub e carregar mais rápido no celular. No fim da portada tem um botão "IR AL PANEL →" que leva direto para o painel principal.

Para trocar o vídeo, basta substituir o arquivo `video/intro.mp4` por outro (mantendo esse nome), ou editar o caminho `src` da tag `<video>` dentro de `screen-intro`, no `index.html`. Se o vídeo novo for grande (a partir de uns 20-25MB), veja a seção "Se o GitHub recusar algum arquivo por tamanho" logo abaixo antes de subir.

## Se o GitHub recusar algum arquivo por tamanho

O GitHub tem dois limites diferentes, e é fácil confundir qual deles está barrando o upload:

- **Upload pela interface do site** (botão "Add file → Upload files"): tende a recusar arquivos a partir de uns 25MB, mesmo que o Git em si aceitasse.
- **Upload por linha de comando** (`git push`): aceita arquivos até 100MB sem problema (só avisa a partir de 50MB, mas deixa passar).

Ou seja: se um arquivo grande for recusado pelo site do GitHub, o mais simples costuma ser subir por linha de comando em vez de arrastar e soltar (veja o passo a passo em "Como publicar no GitHub Pages" acima) — ele aceita bem mais.

Se mesmo assim o arquivo passar de 100MB, as opções são: comprimir mais (para vídeo, reduzir a qualidade/bitrate com uma ferramenta como o [HandBrake](https://handbrake.fr/), gratuita); ou hospedar o arquivo em outro lugar (YouTube não-listado para vídeo, por exemplo) e trocar a tag `<video>` por um `<iframe>` apontando para lá.

## Música do painel

A música anexada (`audio/panel-tema.mp3`) toca automaticamente **só enquanto o painel principal está aberto**: começa quando você entra no painel e para assim que você navega para qualquer outra tela (cartas, rituais, etc.), voltando a tocar se você retornar ao painel. Ela fica em loop enquanto você estiver lá.

Como os navegadores só deixam tocar áudio com som depois de algum clique da pessoa (política de autoplay), e chegar ao painel sempre exige clicar em algum botão antes (o "IR AL PANEL →" da portada, ou qualquer link de navegação dentro do site), isso não costuma dar problema na prática.

Para trocar a música, substitua o arquivo `audio/panel-tema.mp3` por outro (mantendo esse nome), ou edite o caminho `src` da tag `<audio>` no `index.html`.

## Privacidade dos dados

Todas as respostas, rituais completados e lugares marcados no mapa ficam salvos **apenas no navegador da pessoa**, usando `localStorage`. Nada é enviado para nenhum servidor. Isso quer dizer que:

- Os dados só existem naquele navegador específico, naquele computador ou celular específico.
- Limpar os dados de navegação do site (ou usar outro navegador/dispositivo) apaga o progresso.
- Se o site for hospedado publicamente (GitHub Pages público), evite colocar informações pessoais sensíveis diretamente no código-fonte, já que o repositório fica visível.

## Cartas através do tempo

Essa seção do painel tem duas partes bem separadas:

**✉️ Convite para escrever pra você mesmo** — o site convida o Juani a escrever cartas para o próprio futuro através do FutureMe. Essas cartas **nunca ficam guardadas neste site**: o texto só existe na memória da página enquanto ele escreve. Ao clicar em "Enviar através do FutureMe", o texto é copiado para a área de transferência e ele é levado para o [FutureMe](https://www.futureme.org/) (aberto em uma nova aba) para colar e realmente agendar o envio. Não existe API pública do FutureMe para automatizar isso — por isso o fluxo é esse encaminhamento manual, e não uma integração direta. Assim que o fluxo termina, os campos são limpos.

**💌 Aviso das cartas que você já escreveu** — o site NÃO tenta reproduzir ou "revelar" essas cartas — elas chegam de verdade no e-mail do Juani, através do FutureMe, fora do site. O site só mostra um aviso com as datas, para ele saber que estão a caminho. As datas ficam em `emailLetters`, no `script.js`.

### Privacidade das cartas autorais

Isso foi tratado como requisito inegociável: o conteúdo das cartas que o Juani escreve para si mesmo nunca é gravado em `localStorage`, nunca entra no backup na nuvem, nunca aparece em uma URL e nunca é registrado em nenhum log. Ele existe só no campo de texto enquanto está sendo escrito, até ser copiado/enviado — e os campos são limpos assim que o fluxo termina ou é cancelado.

## Visual

O layout segue a linguagem visual do tema Tumblr **Iconic**: preto e branco puro, bordas retas de 2px, cantos retos (sem nenhum arredondamento) e sem sombras — um visual "wireframe" limpo. Tipografia monoespaçada em tudo (**Space Mono** para textos, **Share Tech Mono** para elementos técnicos). A barra fixa no topo é uma faixa preta sólida. Cartões, botões, abas e rótulos usam a mesma lógica do tema de referência: fundo branco com borda preta, e ao passar o mouse ou tocar, invertem para fundo preto com texto branco.

## Som

Além da música do painel (veja acima), o site tem efeitos sonoros discretos e opcionais para navegação (gerados via Web Audio, sem arquivos externos), desligados por padrão. A pessoa pode ativá-los pelo ícone de alto-falante no topo do painel principal — esse toggle controla só os efeitos de clique/navegação, não a música de fundo.

## Playlist

A tela "🎧 Playlist" mostra a playlist do Spotify incorporada direto na página, via `iframe` oficial do Spotify (sem precisar de chave de API nem login). Para trocar de playlist, basta editar a URL dentro do `src` do `iframe` em `index.html`, trocando o ID depois de `/embed/playlist/` pelo ID da nova playlist.

## Foto no Archivo Restringido

No final da seção "Archivo Restringido" tem uma foto guardada em `images/archivo-restringido.png`. Para trocar por outra, basta substituir esse arquivo por outra imagem com o mesmo nome (ou editar o caminho `src` da tag `<img>` dentro de `index.html`, na seção `screen-restricted`).

## Backup na nuvem

Além de salvar tudo em `localStorage` (só no navegador), o site também guarda uma cópia de tudo o que for digitado em um serviço externo gratuito chamado **kvdb.io**, para dar acesso de qualquer navegador ou dispositivo.

Como funciona:

- Na primeira vez que o site abrir, ele cria sozinho uma "gaveta" (bucket) só dele no kvdb.io e mostra um aviso na tela com um código, por exemplo: `☁️ Copia de seguridad en la nube creada. Código: a1b2c3d4e5f6...`
- **Copie esse código** e cole dentro do `script.js`, na seção `cloudSync`:

```js
const cloudSync = {
  enabled: true,
  bucketId: "a1b2c3d4e5f6"   // cole aqui o código mostrado na primeira visita
};
```

- Depois de colar o código e salvar/publicar o site de novo, qualquer navegador ou dispositivo que abrir o site vai puxar e gravar os dados na mesma gaveta — assim tudo o que for digitado no celular também aparece no computador, por exemplo.
- Se `bucketId` ficar em branco, cada navegador cria sua própria gaveta na primeira visita (ou seja, sem sincronizar entre dispositivos até você colar o código de um deles nos outros).

Um ícone no canto direito da barra do topo mostra o status da sincronização: ☁️ em dia, 🔄 sincronizando, ⚠️ sem conexão, ❌ erro ao sincronizar.

**Importante sobre privacidade:** o kvdb.io não pede login nem senha — qualquer pessoa que souber o código do bucket consegue ler (e sobrescrever) os dados guardados nele. Trate esse código como uma senha simples: não publique ele em lugares abertos (redes sociais, repositório público sem cuidado, etc). Para um presente pessoal como esse, entre uma pessoa e ela mesma, isso costuma ser um risco aceitável — mas não é o mesmo nível de segurança de um login de verdade. Se quiser desligar esse backup e usar só o navegador local, é só mudar `enabled: true` para `enabled: false` em `cloudSync`.

## Idioma

Todo o texto que o Juani vê no site está em **espanhol da Argentina** (voseo — "vos", "tenés", "escribí" etc.), com exceção da frase da portada ("De Sarang do presente, para") e da assinatura do rodapé ("cyber sarang =^.^="), que ficaram exatamente como pedido. Os comentários dentro do `script.js` continuam em português, já que são só para quem for editar/configurar o site, não para quem recebe o presente.

## Estrutura de telas

1. Portada (texto + espaço para vídeo + botão para o painel)
2. Painel principal (com a música de fundo)
3. Cartas a través del tiempo (línea de tiempo + compositor de cartas)
4. Rituales
5. Preguntas aleatorias (com histórico de respostas)
6. El mapa emocional
7. Playlist de Spotify
8. Archivo restringido (com a foto no final)

No final de cada tela aparece um rodapé fixo com a frase "Tu hogar es donde esté tu corazón." e a assinatura "cyber sarang =^.^=".
