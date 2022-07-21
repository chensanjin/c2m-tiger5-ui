//  获取车间名称及code
const getFindInfo = (plant) => {
  const plantInfo = [{
      name: '咖啡前处理车间',
      code: 'CD-01'
    },
    {
      name: '咖啡预置填充车间',
      code: 'CD-02'
    },
    {
      name: '干混前处理车间',
      code: 'MD-01'
    },
    {
      name: '干混预置填充一车间',
      code: 'MD-02a'
    },
    {
      name: '干混预置填充二车间',
      code: 'MD-02b'
    },
    {
      name: '包装车间',
      code: 'XD-01'
    },
  ]
  let result = {}
  plantInfo.map((item) => {
    if (item.name === plant) {
      result = {
        ...item
      }
    }
  })
  return result
}
// 获取工艺名称及code
const getProcess = (technology) => {
  const processList = [{
      name: '咖啡前处理',
      code: 'CT-01'
    },
    {
      name: '咖啡预置填充',
      code: 'CT-02'
    },
    {
      name: '干混前处理',
      code: 'MT-01'
    },
    {
      name: '干混预置填充',
      code: 'MT-02'
    },
    {
      name: '茶前处理',
      code: 'TT-01'
    },
    {
      name: '茶预置填充',
      code: 'TT-02'
    },
    {
      name: '包装',
      code: 'XT-01'
    },
  ]
  let process = {}
  processList.map((item) => {
    if (item.name == technology) {
      process = {
        ...item
      }
    } 
  })
  return process
}
// 获取工艺名称及code
const getProcedure=(procedure)=>{
  const procedureList = [{
    name: '生豆清洗',
    code: 'CO-01'
  },
  {
    name: '烘焙',
    code: 'CO-02'
  },
  {
    name: '研磨',
    code: 'CO-03'
  },
  {
    name: '咖啡预置',
    code: 'CO-04'
  },
  {
    name: '咖啡填充',
    code: 'CO-05'
  },
  {
    name: '磨糖',
    code: 'MO-01'
  },
  {
    name: '包配',
    code: 'MO-02'
  },
  {
    name: '混料',
    code: 'MO-03'
  },
  {
    name: '干混预置',
    code: 'MO-04'
  },
  {
    name: '干混填充',
    code: 'MO-05'
  },
]
let result = {}
procedureList.map((item) => {
  if (item.name === procedure) {
    result = {
      ...item
    }
  } 
})
return result
}
export default {
  getFindInfo,
  getProcess,
  getProcedure
}
