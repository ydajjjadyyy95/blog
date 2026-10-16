const formPost = document.getElementById("form-post");
const listaPosts = document.getElementById("lista-posts");

function criarPost(titulo, descricao, imagem) {
  const post = document.createElement("article");
  post.className = "post";

  const tituloPost = document.createElement("h3");
  tituloPost.textContent = titulo;

  const textoPost = document.createElement("p");
  textoPost.textContent = descricao;

  post.appendChild(tituloPost);
  post.appendChild(textoPost);

  if (imagem) {
    const foto = document.createElement("img");
    foto.src = imagem;
    foto.alt = titulo;
    post.appendChild(foto);
  }

  const tituloComentarios = document.createElement("h4");
  tituloComentarios.textContent = "Comentários";

  const listaComentarios = document.createElement("div");
  const campoComentario = document.createElement("input");
  campoComentario.placeholder = "Escreva um comentário";
  campoComentario.setAttribute("aria-label", "Escreva um comentário");

  const botaoComentario = document.createElement("button");
  botaoComentario.textContent = "Comentar";

  botaoComentario.addEventListener("click", function () {
    const texto = campoComentario.value.trim();

    if (texto === "") {
      alert("Digite um comentário antes de enviar.");
      return;
    }

    const comentario = document.createElement("p");
    comentario.className = "comentario";
    comentario.textContent = texto;
    listaComentarios.appendChild(comentario);
    campoComentario.value = "";
  });

  post.appendChild(tituloComentarios);
  post.appendChild(listaComentarios);
  post.appendChild(campoComentario);
  post.appendChild(botaoComentario);
  listaPosts.prepend(post);
}

formPost.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const arquivo = document.getElementById("imagem").files[0];

  if (!arquivo) {
    criarPost(titulo, descricao, "");
    formPost.reset();
    return;
  }

  if (!arquivo.type.startsWith("image/")) {
    alert("Escolha um arquivo de imagem.");
    return;
  }

  const leitor = new FileReader();

  leitor.addEventListener("load", function () {
    criarPost(titulo, descricao, leitor.result);
    formPost.reset();
  });

  leitor.addEventListener("error", function () {
    alert("Não foi possível abrir essa imagem.");
  });

  leitor.readAsDataURL(arquivo);
});

criarPost(
  "Meu primeiro post",
  "Este é um exemplo. Você pode adicionar uma postagem usando o formulário acima.",
  ""
);
