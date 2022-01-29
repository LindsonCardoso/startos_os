import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../lib/bd'

const filter = new Filter()

const sendpj: NextApiHandler = async (req, res) => {
  const { body, method } = req;
  const 
  {
    cnpj,
    razaoSocial,
    nomeFantasia,
    ie,
    email,
    whatsapp,
    cep,
    bairro,
    logradouro,
    cidade,
    numero,
    ibge,
    uf,
    complemento,
    captcha
  } = body
  const tipo = "PJ";
  const origem = "STARTOS"

  if (method === "POST") {
    if (!captcha|| !email || !cnpj || !whatsapp || !email || !uf || !ie || !cep || !bairro || !logradouro || !numero || !cidade || !razaoSocial || !nomeFantasia) {
      return res
        .status(402)
        .json({ message: 'Dados obrigatorios não informados'})
    }
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();

      if (captchaValidation.success) { 
        const results = await query(
          `
          SELECT COUNT(*) verificar from cad_empresa where cli_documento = ?
          `,
          [filter.clean(cnpj)]
        )
        var verif = JSON.stringify(results);
        //console.log(verif);
        var json = JSON.parse(verif);
    
        if (json[0].verificar == 1) {
         return res.status(422).json({ message: 'CNPJ JÁ CADASTRADO'})
        } else 
        {
          const sqlInsert = await query(
            `
            INSERT INTO cad_empresa 
            (
             cli_nome, 
             cli_razaosocial,
             cli_tipo,
             cli_documento,   
             cli_celular,
             cli_email,
             cli_origem,
             cli_cep,
             cli_logradouro,
             cli_numero,
             cli_bairro,
             cli_cidade,
             cli_uf,
             cli_ibge,
             cli_ie,
             cli_complemento 
             ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           `,
            [
              nomeFantasia,
              filter.clean(razaoSocial),
              tipo,
              filter.clean(cnpj),
              filter.clean(whatsapp),
              filter.clean(email),
              origem,
              filter.clean(cep),
              filter.clean(logradouro),
              filter.clean(numero),
              filter.clean(bairro),
              filter.clean(cidade),
              filter.clean(uf),
              filter.clean(ibge),
              filter.clean(ie),
              complemento,
            ]
          )
          return res.status(200).json({message: "successfull"})
        }
      } 
      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      }); 
    } catch (e) {
      res.status(442).json({ message: e.message })
    }
  }
 // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}

export default sendpj