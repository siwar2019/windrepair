import moment from 'moment'
import jsPDF from 'jspdf'
import autoTable, { CellInput } from 'jspdf-autotable'
import { secondaryFont } from '../theme/typography'
import { ImgPaths } from './image-paths'

interface HandleDownloadProps {
    num: number
    total: number
    repairTicket: any
    createdAt: Date
    paymentMethode: string
}

const handleDownloadInvoice = ({ num, total, repairTicket, createdAt, paymentMethode }: HandleDownloadProps) => {
    const doc = new jsPDF()
    const dateCreationInvoice = moment(createdAt).format('YYYY-MM-DD')

    //------------------1st part------------------------
    doc.setFontSize(30)
    doc.setFont(secondaryFont, 'bold')
    doc.text('Facture', 10, 20)
    const spacing = 40
    const startX = 12
    const startY = 40
    doc.addImage(ImgPaths.logo_pdf, 'PNG', 175, 7, 32, 20)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('N.INVOICE', startX, startY)
    doc.text('Date', startX + spacing, startY)
    doc.text('Payment method', startX + spacing * 2, startY)
    doc.text('Amount due', startX + spacing * 3, startY)

    doc.setFont('helvetica', 'normal')
    const invoiceNumber = ` ${num}`
    const date = moment(createdAt).format('DD/MM/YYYY')
    const paymentMethod = ` ${paymentMethode}`
    const amountDue = ` ${total}`

    doc.text(invoiceNumber, startX, startY + 10)
    doc.text(date, startX + spacing, startY + 10)
    doc.text(paymentMethod, startX + spacing * 2, startY + 10)
    doc.text(amountDue, startX + spacing * 3, startY + 10)

    //------------------2nd part------------------------
    const espacement = 82
    const secondX = 12
    const secondY = 60
    const lineSpacing = 7

    doc.setFont('helvetica', 'bold')
    doc.text('BILL FROM', 13, secondY)
    doc.text('BILL TO', secondX + espacement, secondY)

    doc.setFont('helvetica', 'normal')
    const namePartner = repairTicket.product.client.company?.companyName
    const phonePartner = repairTicket.product.client.company?.phone
    const emailPartner = repairTicket.product.client.company?.email

    doc.text(namePartner || '' + ' ' + namePartner, secondX, secondY + lineSpacing)
    doc.text(phonePartner || '', secondX, secondY + lineSpacing * 2)
    doc.text(emailPartner || '', secondX, secondY + lineSpacing * 3)

    const phoneClient = ` ${repairTicket?.product?.client.phone}`
    const emailClient = ` ${repairTicket?.product?.client?.email}`
    const nameClient = ` ${repairTicket?.product?.client?.name}`.toUpperCase()

    doc.text(nameClient, 94, 60 + lineSpacing)
    doc.text(phoneClient, 94, 60 + lineSpacing * 2)
    doc.text(emailClient, 94, 60 + lineSpacing * 3)

    const tableColumnHeaders = ['Name', 'Category', 'Price']
    const tableRows: (string | number | CellInput)[][] = []

    repairTicket?.product?.parts.forEach((part: any) => {
        tableRows.push([part.name, part.category, part.price + ' TND'])
    })

    tableRows.push([
        {
            content: `Total:             ${total}  TND\nAmount Paid:             0  TND\nLeft to Pay:              ${total} TND`,
            colSpan: 3,
            styles: { halign: 'right', valign: 'middle', cellPadding: 5, fontStyle: 'normal' }
        }
    ])

    autoTable(doc, {
        startY: 100,
        head: [tableColumnHeaders],
        body: tableRows,
        theme: 'grid',
        styles: {
            lineWidth: 0,
            halign: 'left',
            valign: 'middle',
            fontSize: 12,
            textColor: 20,
            fontStyle: 'normal'
        },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: 0,
            fontStyle: 'bold',
            lineWidth: 0
        },
        margin: { top: 30 },
        didDrawCell: (data: any) => {
            const { cell, doc } = data
            const rowIndex = data.row.index

            if (cell) {
                if (data.section === 'head') {
                    doc.setDrawColor('#B92A1A', 0, 0)
                    doc.setLineWidth(0.5)
                    doc.line(cell.x, cell.y, cell.x + cell.width, cell.y)
                    doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height)
                } else if (
                    rowIndex === 0 ||
                    rowIndex === tableRows.length - 1 ||
                    tableRows[rowIndex]?.some(
                        (cellItem) =>
                            cellItem &&
                            typeof cellItem === 'object' &&
                            'content' in cellItem &&
                            typeof cellItem.content === 'string' &&
                            (cellItem.content.includes('Total') || cellItem.content.includes('Amount Paid'))
                    )
                ) {
                    doc.setDrawColor('#B92A1A', 0, 0)
                    doc.setLineWidth(0.5)
                    doc.line(cell.x, cell.y, cell.x + cell.width, cell.y)
                    const isLeftToPay = rowIndex === tableRows.length - 1
                    const isAmountPaid = tableRows[rowIndex]?.some(
                        (cellItem) =>
                            cellItem &&
                            typeof cellItem === 'object' &&
                            'content' in cellItem &&
                            typeof cellItem.content === 'string' &&
                            cellItem.content.includes('Amount Paid')
                    )

                    if (isLeftToPay || isAmountPaid) {
                        const textContent = isLeftToPay
                            ? `Left to Pay: ${total - repairTicket?.totalCost} TND`
                            : `Amount Paid: ${repairTicket?.totalCost} TND`
                        const textWidth = doc.getTextWidth(textContent)
                        const startX = cell.x + cell.width - textWidth * 1.8
                        doc.line(startX, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height)
                    } else {
                        doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height)
                    }
                } else {
                    doc.setDrawColor('#C5C5C5', '#C5C5C5', '#C5C5C5')
                    doc.setLineWidth(0.5)
                    doc.line(cell.x, cell.y, cell.x + cell.width, cell.y)
                }
            }
        }
    })

    doc.save(`invoice${dateCreationInvoice}.pdf`)
}

export default handleDownloadInvoice
