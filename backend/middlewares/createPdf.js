const express = require('express');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const path = require('path');

function createPdf(document) {
    console.log('document', document);
    const doc = new PDFDocument({
        margin: 20,
        font: 'Times-Roman',
        width: 600
    });
    const parentUrl = path.resolve(__dirname, '..');
    // const iconPath = path.join(parentUrl, 'local-images/bsmrstu_logo.jpeg');
    // doc.image(iconPath, 20, 20, {
    //   height: 24,
    //   width: 24
    // });
    doc.font('Times-Roman').fillColor('green').fontSize(14).text('Bangabandhu Sheikh Mujibur Rahman Science and Technology University, Gopalganj', 0, 25, {
        width: 600,
        align: 'center',
    });
    doc.moveDown();
    doc.fillColor('black').fontSize(12).text('Registration Form', {
        width: 600,
        align: 'center',
    });
    /* Exam Name */
    doc.fontSize(11).text(`${document.examName}`, 30, 80, {
        width: 600
    });
    /***** Student Name *****/
    doc.fontSize(11).text(`Name`, 30, 100, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.name}`, 160, 100, {
        width: 600
    });
    /***** Father's Name *****/
    doc.fontSize(11).text(`Father's Name`, 30, 120, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.fatherName}`, 160, 120, {
        width: 600
    });
    /***** Mother's Name *****/
    doc.fontSize(11).text(`Mother's Name`, 30, 140, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.motherName}`, 160, 140, {
        width: 600
    });
    /***** Husband/Guardian's Name *****/
    doc.fontSize(11).text(`Husband/Guardian's Name`, 30, 160, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.guardianName}`, 160, 160, {
        width: 600
    });
    /***** Present Address *****/
    doc.fontSize(11).text(`Present Address`, 30, 180, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.address}`, 160, 180, {
        width: 600
    });
    /***** Phone *****/
    doc.fontSize(11).text(`Phone`, 30, 200, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.phone}`, 160, 200, {
        width: 600
    });
    /***** Permanent Address *****/
    doc.fontSize(11).text(`Permanent Address`, 30, 220, {
        width: 600
    });
    //Village
    doc.fontSize(11).text(`Village`, 60, 240, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.village}`, 160, 240, {
        width: 600
    });
    //Post Office
    doc.fontSize(11).text(`Post Office`, 300, 240, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.postOffice}`, 400, 240, {
        width: 600
    });
    //Sub-District
    doc.fontSize(11).text(`Sub-District`, 60, 260, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.subDistrict}`, 160, 260, {
        width: 600
    });
    //District
    doc.fontSize(11).text(`District`, 300, 260, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.district}`, 400, 260, {
        width: 600
    });
    /***** Nationality *****/
    doc.fontSize(11).text(`Nationality`, 30, 280, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.nationality}`, 160, 280, {
        width: 600
    });
    /***** Religion *****/
    doc.fontSize(11).text(`Religion`, 300, 280, {
        width: 600
    });
    doc.fontSize(11).text(`: ${document.religion}`, 400, 280, {
        width: 600
    });
    /***** Birth Date *****/
    doc.fontSize(11).text(`Birth Date`, 30, 300, {
        width: 600
    });
    doc.fontSize(11).text(`: ${new Date(document.birthDate).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })}`, 160, 300, {
        width: 600,
        format: {
            type: 'date',
            param: 'dd mm yyyy'
        }
    });
    /***** Academic Qualification *****/
    let len = document.academicInfo.length;
    doc.fontSize(11).text('Academic Qualification', 30, 320).text(':', 160, 320);
    doc.fontSize(11).text('Exam Name', 40, 340).text('Passing Year', 130, 340).text('Institute', 200, 340).text('Board', 350, 340).text('Roll', 450, 340).text('GPA', 550, 340);
    doc.lineWidth(0.0000000001);
    doc.lineCap('butt').moveTo(30, 335).lineTo(580, 335).stroke(); // upper horizontal line
    doc.lineCap('butt').moveTo(30, 355).lineTo(580, 355).stroke(); // middle horizontal line
    doc.lineCap('butt').moveTo(30, 335 + ((len + 1) * 20)).lineTo(580, 335 + ((len + 1) * 20)).stroke(); // bottom horizontal line
    doc.lineCap('butt').moveTo(30, 335).lineTo(30, 335 + ((len + 1) * 20)).stroke(); // left border
    doc.lineCap('butt').moveTo(580, 335).lineTo(580, 335 + ((len + 1) * 20)).stroke(); // right border
    document.academicInfo.forEach((element, i) => {
        doc.fontSize(11)
            .text(`${element.examName}`, 40, (340 + (i + 1) * 20))
            .text(`${element.passingYear}`, 130, (340 + (i + 1) * 20))
            .text(`${element.institute}`, 200, (340 + (i + 1) * 20))
            .text(`${element.board}`, 350, (340 + (i + 1) * 20))
            .text(`${element.examRoll}`, 450, (340 + (i + 1) * 20))
            .text(`${element.GPA}`, 550, (340 + (i + 1) * 20));
    });
    /***** Course Information *****/
    let Y = 335 + ((len + 1) * 20) + 10;
    doc.fontSize(11).text('Description of selected courses for this examination', 30, Y);
    Y += 20;
    len = document.courses.length;
    doc.fontSize(11).text('No.', 40, Y).text('Course Code', 40 + 53, Y).text('Course Name', 40 + 3 * 53, Y).text('Course Credits', 40 + 8 * 53, Y);
    doc.lineWidth(0.0000000001);
    doc.lineCap('butt').moveTo(30, Y - 5).lineTo(580, Y - 5).stroke(); // upper horizontal line
    doc.lineCap('butt').moveTo(30, Y + 15).lineTo(580, Y + 15).stroke(); // middle horizontal line
    doc.lineCap('butt').moveTo(30, Y - 5 + ((len + 1) * 20)).lineTo(580, Y - 5 + ((len + 1) * 20)).stroke(); // bottom horizontal line
    doc.lineCap('butt').moveTo(30, Y - 5).lineTo(30, Y - 5 + ((len + 1) * 20)).stroke(); // left border
    doc.lineCap('butt').moveTo(580, Y - 5).lineTo(580, Y - 5 + ((len + 1) * 20)).stroke(); // right border
    document.courses.forEach((element, i) => {
        Y += 20;
        doc.fontSize(11)
            .text(`${i + 1}`, 40, Y)
            .text(`${element.courseCode}`, 40 + 53, Y)
            .text(`${element.courseName}`, 40 + 3 * 53, Y)
            .text(`${element.courseCredits}`, 40 + 8 * 53, Y);
    });


    console.log('path', parentUrl);
    const userName = document.name.split(' ').join('-');
    const pdfPath = path.join(parentUrl, `pdf-files/${userName}-info-${new Date().getTime()}.pdf`);
    console.log('pdfPath', pdfPath);
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.end();
    return pdfPath;
}

module.exports = {createPdf};
