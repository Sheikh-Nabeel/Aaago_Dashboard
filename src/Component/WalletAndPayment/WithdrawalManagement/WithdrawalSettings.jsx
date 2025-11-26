import React from 'react'
import axiosInstance from '../../../services/axiosConfig'
import toast from 'react-hot-toast'

const WithdrawalSettings = () => {
  const [form, setForm] = React.useState({
    frequency: '',
    dailyLimitPerUser: '',
    weeklyLimit: '',
    blockIfUserFlagged: true,
    blockIfKycIncomplete: true,
    blockIfSameAccountUsedByMultiple: true,
  })

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get('/wallet/admin/settings')
        const d = res.data?.data || res.data
        const w = d?.withdrawalSettings || {}
        const fz = d?.freezeRules || {}
        setForm({
          frequency: w.frequency || '',
          dailyLimitPerUser: w.dailyLimitPerUser ?? '',
          weeklyLimit: w.weeklyLimit ?? '',
          blockIfUserFlagged: Boolean(fz.blockIfUserFlagged),
          blockIfKycIncomplete: Boolean(fz.blockIfKycIncomplete),
          blockIfSameAccountUsedByMultiple: Boolean(fz.blockIfSameAccountUsedByMultiple),
        })
      } catch (e) {
        // keep defaults
      }
    }
    fetchSettings()
  }, [])

  const setPath = (path, val) => {
    setForm(prev => ({ ...prev, [path]: val }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        withdrawalSettings: {
          frequency: form.frequency || '',
          dailyLimitPerUser: form.dailyLimitPerUser === '' ? 0 : Number(form.dailyLimitPerUser),
          weeklyLimit: form.weeklyLimit === '' ? 0 : Number(form.weeklyLimit),
        },
        freezeRules: {
          blockIfUserFlagged: Boolean(form.blockIfUserFlagged),
          blockIfKycIncomplete: Boolean(form.blockIfKycIncomplete),
          blockIfSameAccountUsedByMultiple: Boolean(form.blockIfSameAccountUsedByMultiple),
        },
      }
      const res = await axiosInstance.put('/wallet/admin/settings', payload)
      if (res.data?.success) {
        toast.success(res.data?.message || 'Settings updated')
      } else {
        toast.error(res.data?.message || 'Update failed')
      }
    } catch (e) {
      toast.error(e.response?.data?.message || e.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className=" text-yellow-400 p-6 rounded-md w-full max-w-5xl mx-auto border border-yellow-500 mt-10">
      <h2 className="text-xl font-bold mb-4">Withdrawal Settings :</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="withdrawal-frequency">Withdrawal Frequency:</label>
        <select id="withdrawal-frequency" name="withdrawalFrequency" value={form.frequency} onChange={(e) => setPath('frequency', e.target.value)} className="w-full p-2 rounded-full text-yellow-300 border border-yellow-400 focus:outline-none bg-[#013220]">
          <option value="">Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="daily-limit">Daily Limit Per User</label>
        <input type="number" id="daily-limit" name="dailyLimit" value={form.dailyLimitPerUser} onChange={(e) => setPath('dailyLimitPerUser', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 placeholder:text-yellow-400 bg-[#013220] focus:outline-none rounded-full text-yellow-300 border border-yellow-400" placeholder="Enter amount" />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium" htmlFor="weekly-limit">Weekly Limit</label>
        <input type="number" id="weekly-limit" name="weeklyLimit" value={form.weeklyLimit} onChange={(e) => setPath('weeklyLimit', e.target.value === '' ? '' : Number(e.target.value))} className="w-full p-2 rounded-full bg-[#013220] focus:outline-none  placeholder:text-yellow-400 border border-yellow-400" placeholder="Enter amount" />
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-4">Freeze Rules:</h3>
        <label className="flex items-center mb-4">
          <input type="checkbox" name="blockIfFlagged" className="mr-2 accent-yellow-400" checked={form.blockIfUserFlagged} onChange={(e) => setPath('blockIfUserFlagged', e.target.checked)} />
          Block if user flagged
        </label>
        <label className="flex items-center mb-4">
          <input type="checkbox" name="blockIfKYCIncomplete" className="mr-2 accent-yellow-400" checked={form.blockIfKycIncomplete} onChange={(e) => setPath('blockIfKycIncomplete', e.target.checked)} />
          Block if KYC incomplete
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="blockIfShared" className="mr-2 accent-yellow-400" checked={form.blockIfSameAccountUsedByMultiple} onChange={(e) => setPath('blockIfSameAccountUsedByMultiple', e.target.checked)} />
          Block if same account used by 2+ users
        </label>
      </div>

      <button type="submit" className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full block mx-auto hover:bg-yellow-300">Apply Adjustment</button>
    </form>
  )
}

export default WithdrawalSettings;
