const certification = require('./test')


test('Read-a-certification exists', async () => {
  expect.assertions(1)
  return expect(typeof (test.readCertification)).toBe('function')
})

test('Read an certification by id', async () => {
//create evaluation
  const evaluationdata = {
        evaluationCode: '',
        certificationName: '',
        certificationCode: '',
        styleOfEvaluation: '',
        link:'',
        dateOfEvaluation:'',
        durationOfExamInHours: '',
        nameOfEducationalOrganisationOfferingIt: '',
        emailCOfEducationalOrganisationOfferingIt: ''
    }
  const createevaluation = await test.createCompany(evaluationdata) 
  const createdEvaluation = createevaluation.data.data
  const evaluationID = createdEvaluation['_id']

//create member1
const evaluationdata = {
    evaluationCode: '',
    certificationName: '',
    certificationCode: '',
    styleOfEvaluation: '',
    link:'',
    dateOfEvaluation:'',
    durationOfExamInHours: '',
    nameOfEducationalOrganisationOfferingIt: '',
    emailCOfEducationalOrganisationOfferingIt: ''
}
const createevaluation = await test.createCompany(evaluationdata) 
const createdEvaluation = createevaluation.data.data
const evaluationID = createdEvaluation['_id']

 
 
 
  const data = {
    name_of_certification: 'javascript',
    Evaluation_of_available: '1837-02-15',
    Fees:'1200',
    Method_of_payment:'cash',
    Evaluation_procedure:evaluationID
  }
  const created = await investor.createInvestor(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await investor.readInvestor(id)
  const readData = read.data.data
  expect.assertions(1)
  return expect(readData).toEqual(createdData)
})

test('Delete-an-Investor exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.deleteInvestor)).toBe('function')
},
10000)

test('Delete an Investor by id', async () => {
  const data = {
    fullName: 'Kevin Smith',
    birthdate: '2001-10-02',
    email: 'high@tower.net'
  }
  const created = await investor.createInvestor(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const deleted = await investor.deleteInvestor(id)
  const deletedData = deleted.data.deletedInvestor
  expect.assertions(1)
  return expect(deletedData).toEqual(createdData)
})

test('Create-an-Investor exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.createInvestor)).toBe('function')
})

test('Create-an-Investor', async () => {
  const data = {
    fullName: 'Anthony Martial',
    birthdate: '1996-12-20',
    email: 'hey@everyone.com'
  }
  const created = await investor.createInvestor(data)
  const createdData = created.data.data
  const id = createdData['_id']
  const read = await investor.readInvestor(id)
  const readData = read.data.data
  expect.assertions(1)
  return expect(readData).toEqual(createdData)
})

test('Update-an-Investor exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.updateInvestor)).toBe('function')
})

test('Update an Investor by id', async () => {
  const data = {
    fullName: 'Bill Marks',
    birthdate: '1990-10-18',
    email: 'hello@world.com'
  }
  const createdInvestor = await investor.createInvestor(data)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']

  const newData = {
    email: 'billmarks@yahoo.com' // used email as it's the most likely field to get updated
  }
  const updatedInfo = {
    fullName: 'Bill Marks',
    birthdate: '1990-10-18T00:00:00.000Z',
    email: 'billmarks@yahoo.com'
  }
  const updated = await investor.updateInvestor(newData, id)
  const updatedData = updated.data.data
  expect.assertions(1)
  return expect(updatedData).toMatchObject(updatedInfo)
})

test('edit-form-by-Investor exists', async () => {
  expect.assertions(1)
  return expect(typeof (investor.editForm)).toBe('function')
})

test('edit a form by an Investor', async () => {
  const data = {
    data: [ 'cairo', 23, 2255 ]
  }
  const investorTest = {
    fullName: 'Kevin Smith',
    birthdate: '2001-10-02',
    email: 'high@tower.net'
  }
  const createdInvestor = await investor.createInvestor(investorTest)
  const createdInvestorData = createdInvestor.data.data
  const id = createdInvestorData['_id']

  const companyData = {
    form: {
      data: ['cairo', 23, 5555],
      acceptedByLawyer: -1,
      acceptedByReviewer: -1,
      filledByLawyer: false,
      paid: false
    },
    investorId: id,
    name: 'test',
    type: 'SSC',
    accepted: false
  }
  const createdCompany = await company.createCompany(companyData)
  const createdCompanyData = createdCompany.data.data
  const companyId = createdCompanyData['_id']
  const updatedForm = await investor.editForm(data, companyId)
  const UpdatedFormData = updatedForm.data.updatedCompany.form.data
  expect.assertions(1)
  return expect(UpdatedFormData).toEqual(data.data)
})
// As an investor I should be able to show a list for my peniding and established companies.
test('Get Companies Exist', async () => {
  expect.assertions(1)
  expect(typeof (investor.getCompanies)).toBe('function')
})
test('Get my companies', async () => {
  const investorData = {
    fullName: 'Naguib sawiris',
    birthdate: '1950-05-15',
    email: 'sawiris@gmail.com'
  }
  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const investorId = createdInvestorData['_id']
  const companyData1 = {
    name: 'Nike',
    establishmentDate: '1837-08-20',
    type: 'SSC',
    state: 'established',
    accepted: true,
    investorId: investorId,
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    }
  }
  const companyData2 = {
    name: 'puma',
    establishmentDate: '1820-05-15',
    type: 'SPC',
    state: 'peniding',
    accepted: true,
    investorId: investorId,
    form: {
      data: [],
      comment: 'good company',
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    }
  }
  const company1 = await company.createCompany(companyData1)
  const firstCompany = company1.data.data
  const company2 = await company.createCompany(companyData2)
  const secondCompany = company2.data.data
  const expected = await investor.getCompanies(investorId)
  const expectedData = expected.data.data
  const myCompanies = [firstCompany, secondCompany]
  expect.assertions(1)
  expect(expectedData).toEqual(myCompanies)
})
// As an investor I should be able to fill an application form, so that I can establish a company.
test('Fill Form Exist', async () => {
  expect.assertions(1)
  expect(typeof (investor.fillForm)).toBe('function')
})
test('Fill Form to create a company', async () => {
  const investorData = {
    fullName: 'Naguib sawiris',
    birthdate: '1950-02-18',
    email: 'sawiris@gmail.com'
  }
  const createdInvestor = await investor.createInvestor(investorData)
  const createdInvestorData = createdInvestor.data.data
  const investorId = createdInvestorData['_id']
  const companyData= {
    name: 'UBER',
    type: 'SPC'
    form: {
      data: [],
      acceptedByLawyer: 1,
      acceptedByReviewer: 1,+
      filledByLawyer: false,
      paid: true,
      lawyerID: '5c9a6888bca2114a80a5c124',
      reviewerID: '5c9660e5e008212d705efd15'
    }
  }
})