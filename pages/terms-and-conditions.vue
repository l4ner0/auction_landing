<template>
  <div class="container">
    <div class="grid justify-center pb-[48px] px-4 md:px-[80px]">
      <div class="w-full max-w-[1280px] gap-x-[24px] mx-auto">
        <div class="mx-auto p-6 bg-white">
          <h1 class="text-2xl font-bold text-center mb-6">
            TÉRMINOS Y CONDICIONES DE USO DEL PORTAL DEOCASION
          </h1>
          
          <p class="mb-4">
            Quien/es suscribe/n el presente documento (en adelante EL USUARIO) declaran conocer y aceptar los siguientes términos y condiciones de la plataforma de DE OCASION S.A.C. con RUC N° 20613176595 con domicilio en Av. A Freund Noble 183, distrito de Chorrillos, Lima:
          </p>
          
          <ol class="list-decimal pl-6 space-y-4 mb-6">
            <li
              v-for="(term, index) in terms"
              :key="index"
              class="text-gray-700"
            >
              {{ term }}
            </li>
          </ol>
          
          <h2 class="text-xl font-semibold mb-4">GLOSARIO DE TÉRMINOS:</h2>
          <dl class="space-y-3 mb-4">
            <div v-for="(definition, term) in glossary" :key="term">
              <dt class="font-bold">{{ term }}:</dt>
              <dd class="ml-4">{{ definition }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const terms = [
  "Para participar en las subastas divulgadas en DEOCASION, el Usuario deberá proceder con su registro informando sus datos personales. Se deben completar todos los campos de forma clara y precisa. Siempre que sea necesario, el Usuario deberá actualizar su registro.",
  "Al registrarse, el Usuario indicará un LOGIN que lo identificará en el PORTAL y una CONTRASEÑA personal e intransferible, que no se podrá utilizar con otras finalidades no autorizadas.",
  "El Usuario se compromete a no divulgar su contraseña a terceros. El uso no autorizado de la contraseña es de total responsabilidad del Usuario.",
  "El Usuario registrado autoriza que DEOCASION consulte Centrales de Riesgo y entidades competentes, para la verificación de sus datos.",
  "Si se verifica inconsistencia y/o problemas legales, judiciales o financieros asociados a los datos informados por el Usuario la Central de Atención contactará con este, por correo electrónico o teléfono.",
  "El usuario debe aceptar los presente términos y condiciones para registrarse en DEOCASION.",
  "El usuario podrá utilizar la web de DEOCASION después de la validación del registro y la aceptación de los términos.",
  "DEOCASION permite recibir ofertas por internet y en tiempo real.",
  "El usuario una vez que haya validado su cuenta, para participar en una oferta y realizar una puja, deberá haber pagado la garantía señalada en la publicación de la Oferta. Las pujas solo pueden hacerse a través de la web de DEOCASION.",
  "Para proceder con la aplicación de la garantía y entrar a la puja o un evento previamente deberá recargar el monedero electrónico en la web a través de un depósito a las cuentas de DEOCASION. Esta recarga la deberá de hacer en los siguientes pasos: 1) realizar la recarga en las cuentas de DEOCASION en Dólares Americanos (USD), 2) realizar una foto o guardar la captura según haya sido el medio, 3) realizar la solicitud de recarga de monedero ingresando los datos solicitados y cargando el sustento mencionado en el punto 2), 4) confirmar el envío. Una vez que la solicitud haya sido registrada, el personal de DEOCASION realizará la evaluación con la finalidad de autorizar o rechazar la solicitud dentro de los 3 días útiles siguientes. En caso que haya sido autorizada, el monto de la solicitud se verá reflejada en el monedero como Saldo disponible. Caso contrario, deberá ponerse en contacto para resolver la situación. monto mínimo para poder participar en una puja o evento es de 100.00 USD por concepto de garantía de participación, el monto máximo por solicitud es de 1000.00 USD, teniendo cada usuario como máximo 3 solicitudes por día. Asimismo, en caso desee realizar el retiro del monto dado en garantía puede solicitarlo a través de la plataforma ingresando en su cuenta, ahí se indicarán los pasos para el retiro, comunicación del proceso será a su correo electrónico. En caso se evidencie un mal uso, DEOCASION procederá a suspender la cuenta del usuario.",
  "El usuario podrá hacer más de una Puja al mismo bien, en caso la primera puja realizada por éste sea superada por otro usuario, y así sucesivamente, del cual prevalecerá la puja mayor realizado dentro del tiempo máximo disponible en la web.",
  "El usuario deberá estar pendiente de las publicaciones de subastas disponibles en la web y realizar las pujas en línea. Las pujas recibidas serán registradas en la web en línea hasta obtener la puja mayor dentro del tiempo máximo, el cual una vez transcurrido cerrará la Oferta.",
  "Cada oferta tiene la fecha y el horario previsto de cierre, en su página de descripción. Cerca del horario del cierre, en la página de ofertas FlashBid, el reloj indica el tiempo pendiente para cerrar. Si el sistema recibe alguna puja dentro del intervalo de 2 (dos) minutos antes del cierre de la oferta, el cronómetro aumenta en 2 minutos adicionales sucesivamente a cada oferta efectuado en ese intervalo, para que todos los Usuarios interesados tengan la oportunidad de efectuar nuevas ofertas.",
  "El usuario que no haya salido ganador, se le devolverá el monto de la garantía a su monedero electrónico en un plazo de un día calendario. El usuario ganador de la Oferta recibirá una comunicación al correo designado en su registro, confirmando la compra y el procedimiento para la transferencia del bien a su favor, una vez concluido el proceso de transferencia y haber realizado el depósito de la compra, la garantía será devuelta a su monedero electrónico, de no realizar la transferencia del bien a su favor por responsabilidad del usuario, ejemplo: no haya realizado el depósito en el plazo establecido en la comunicación, perderá la garantía otorgada y está no será devuelta al monedero electrónico.",
  "En caso el usuario haya participado y ganado en un evento más de una oferta, deberá seguir los mismos pasos descritos en los numerales anteriores; sin embargo, en caso no se realice la transferencia de uno de las pujas ganadas dentro de los tiempos establecidos en la comunicación realizada, sin perjuicio de concretar la venta de los que sí han sido transferido correctamente, se perderá la garantía otorgada por la participación en el evento.",
  "Cabe señalar que, DEOCASION una vez recibida la puja ganadora podrá realizar una contraoferta, el cual el usuario ganador podrá aceptar abonando la diferencia que corresponda o rechazarla, caso en el cual quedará sin efecto la compra y se podrá volver a publicitar la oferta, sin penalidad alguna para el usuario ganador. De ser que, el usuario ganador acepté la contraoferta y no realice el pago en el plazo señalado se aplicará una penalidad que será el monto otorgado en garantía.",
  "El Usuario registrado autoriza a DEOCASION a consultar bases de datos para verificar la veracidad de sus datos, la moralidad crediticia del Usuario y sus antecedentes judiciales, en caso de ser posible realizarlo. De la misma manera autoriza a DEOCASION a reportar la información a las centrales de riesgo del sector financiero o privadas sobre su real comportamiento comercial del aceptante, la cual será actualizada periódicamente conforme con lo establecido por las leyes de la república de Perú, las cuales el Usuario registrado declara conocer a cabalidad.",
];

const glossary = {
  "EVENTO": "Contiene varias ofertas de un solo ofertante.",
  "PUJA": "Ofrecimiento de una cantidad de dinero no menor al precio base.",
  "OFERTA": "El bien mueble a vender a través de nuestra web.",
  "OFERENTE": "Persona Jurídica que ofrece el bien mueble a vender a través de nuestra web.",
  "USUARIO": "Persona Natural o jurídica inscrita en la Plataforma web de DEOCASION que realiza puja y compra de los bienes muebles publicitados.",
  "GARANTÍA": "Monto mínimo para participar en la oferta."
};

</script>