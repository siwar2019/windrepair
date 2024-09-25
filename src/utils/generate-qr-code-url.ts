import QRCode from 'qrcode-generator'

export const generateQRCodeUrl = (value: string) => {
    const typeNumber = 10
    const errorCorrectionLevel = 'L'
    const qr = QRCode(typeNumber, errorCorrectionLevel)
    qr.addData(value)
    qr.make()
    const qrImage = qr.createDataURL()

    return qrImage
}
