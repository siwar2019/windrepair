import { Password, Type } from './constants'

export const handlePrinter = (
    selectedType: Type,
    qrCodeUrl: string,
    code: string,
    selectedPassword: Password,
    password: string,
    logo: string,
    t: (key: string) => string,
    logoPartner?: string
) => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>${t('ticketPage.printTicket')}</title>
          <style>
              @media print {
                  @page {
                      size: 60mm 78mm;
                      margin: 0;
                  }
                  body {
                      margin: 0;
                      padding: 0;
                  }
              }
              .main-container {
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .logo-wind {
                display:flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-end;
              }
            }
          </style>
      </head>
      <body>
      <div class="main-container">
      ${
          logoPartner
              ? `<img id="logo" src="${
                    logoPartner.startsWith('data:image/png;base64')
                        ? logoPartner
                        : `${process.env.REACT_APP_HOST_API_ASSEST}${logoPartner}`
                }" width="60px" height="55px" />`
              : ''
      }  
              ${
                  selectedType === Type.QR_CODE
                      ? `
                <img src="${qrCodeUrl}" alt="QR Code" />
            `
                      : `
                    <h5>${code}</h5>
            `
              }
              ${
                  selectedPassword === Password.PASSWORD
                      ? `
                    <p>${t('ticketPage.fields.password')}: ${password}</p>
            `
                      : ''
              }
           
        </div>
        <div class="logo-wind">
        <p>Powered by</p>
        <img id="logo" src="${logo}"  width="25px" height="25px" /></div>
      </body>
      </html>
    `

    const iframe = document.createElement('iframe')
    iframe.style.position = 'absolute'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentWindow?.document
    iframeDoc?.open()
    iframeDoc?.write(printContent)
    iframeDoc?.close()

    const logoImage = iframeDoc?.getElementById('logo')

    if (logoImage) {
        logoImage.onload = () => {
            iframe.contentWindow?.focus()
            iframe.contentWindow?.print()
            setTimeout(() => {
                document.body.removeChild(iframe)
            }, 1000)
        }

        logoImage.onerror = () => {
            iframe.contentWindow?.focus()
            iframe.contentWindow?.print()
            setTimeout(() => {
                document.body.removeChild(iframe)
            }, 1000)
        }
    } else {
        iframe.contentWindow?.focus()
        iframe.contentWindow?.print()
        setTimeout(() => {
            document.body.removeChild(iframe)
        }, 1000)
    }
}
