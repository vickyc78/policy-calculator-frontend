import React from 'react';

export default function PolicyForm({ form, setForm, onCalculate }) {
  const set = (k,v) => setForm(prev => ({ ...prev, [k]: v }));
  return (
    <div>
      <select value={form.type} onChange={e=>set('type', e.target.value)}>
        <option value="">Select type</option>
        <option value="Term">Term</option>
        <option value="ULIP">ULIP</option>
        <option value="Endowment">Endowment</option>
      </select>
      <input type="date" value={form.dob} onChange={e=>set('dob', e.target.value)} placeholder="DOB" />
      <input type="number" value={form.sumAssured} onChange={e=>set('sumAssured', Number(e.target.value))} placeholder="Sum Assured" />
      <input type="number" value={form.premiumAmount} onChange={e=>set('premiumAmount', Number(e.target.value))} placeholder="Premium Amount" />
      <select value={form.premiumFrequency} onChange={e=>set('premiumFrequency', e.target.value)}>
        <option value="Yearly">Yearly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <input type="number" value={form.termYears} onChange={e=>set('termYears', Number(e.target.value))} placeholder="Term Years" />
      <input value={form.name} onChange={e=>set('name', e.target.value)} placeholder="Policyholder Name" />
      <input value={form.mobile} onChange={e=>set('mobile', e.target.value)} placeholder="Mobile (10 digits)" />
      <button onClick={onCalculate}>Calculate</button>
    </div>
  );
}
