import React, { useState } from 'react';
import { X, User, MapPin, Phone, Landmark, Briefcase, FileText, CheckCircle2, AlertCircle, Clock, FileImage, Download, Maximize2, Search } from 'lucide-react';
import { API_URL, adminApi } from '../api';

const MemberDetailModal = ({ member, onClose, onStatusUpdate }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [draftKycStatus, setDraftKycStatus] = useState(member?.kycStatus || 'PENDING');
  const [draftApplicationStatus, setDraftApplicationStatus] = useState(member?.applicationStatus || 'PENDING');
  const [draftNotes, setDraftNotes] = useState(member?.verificationNotes || '');
  const [loading, setLoading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  // New states for Rejection and Request Docs Modals
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  
  const [requestDocsModalOpen, setRequestDocsModalOpen] = useState(false);
  const [requestDocsReason, setRequestDocsReason] = useState('');

  if (!member) return null;

  const submitStatusUpdate = async (payload) => {
    setLoading(true);
    try {
      const res = await adminApi.put(`/members/${member.id}/status`, { ...payload, adminName: 'Admin' });
      onStatusUpdate(res);
      return true;
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    const success = await submitStatusUpdate({
      kycStatus: draftKycStatus,
      applicationStatus: draftApplicationStatus,
      verificationNotes: draftNotes
    });
    if (success) alert('Changes saved successfully!');
  };

  const executeReject = async () => {
    if (!rejectReason.trim()) return alert("Please enter a rejection reason.");
    const success = await submitStatusUpdate({ applicationStatus: 'REJECTED', rejectionReason: rejectReason });
    if (success) {
      setRejectModalOpen(false);
      alert("Application rejected successfully and moved to the Rejected Applications page.");
      onClose();
    }
  };

  const executeRequestDocs = async () => {
    if (!requestDocsReason.trim()) return alert("Please enter the reason for requesting documents.");
    const success = await submitStatusUpdate({ applicationStatus: 'REQUEST_MORE_DOCUMENTS', requestMoreDocsReason: requestDocsReason });
    if (success) {
      setRequestDocsModalOpen(false);
      alert(`Notification sent to ${member.fullName} (${member.email || member.mobileNumber}) requesting more documents.`);
      onClose();
    }
  };

  const renderField = (label, value) => (
    <div className="flex flex-col mb-4">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
      <span className="text-sm font-semibold text-slate-800">{value || '-'}</span>
    </div>
  );

  const documents = [
    { name: 'Applicant Photograph', type: 'image', url: member.photoUrl || member.applicantPhoto },
    { name: 'Aadhaar Card Proof', type: 'pdf', url: member.aadhaarUrl || member.aadhaarProof },
    { name: 'PAN Card Proof', type: 'pdf', url: member.panUrl || member.panProof },
    { name: 'Address Proof', type: 'pdf', url: member.addressProofUrl || member.addressProof },
    { name: 'Signature', type: 'image', url: member.signatureUrl || member.signature }
  ].filter(d => d.url);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white w-full h-full sm:h-[90vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#0B1F4D] text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-black text-xl border border-white/20">
              {(member.fullName || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-black">{member.fullName}</h2>
              <div className="flex gap-3 text-sm font-medium mt-1 text-blue-200">
                <span>{member.memberId || 'Pending ID'}</span>
                <span>•</span>
                <span>{member.mobileNumber}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-64 bg-slate-50 border-r border-slate-100 p-4 flex flex-col gap-2 overflow-y-auto hidden md:flex">
            <button onClick={() => setActiveTab('details')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'details' ? 'bg-[#0B1F4D] text-white shadow-md' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}>
              <User size={16} /> Member Details
            </button>
            <button onClick={() => setActiveTab('documents')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'documents' ? 'bg-[#0B1F4D] text-white shadow-md' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}>
              <FileText size={16} /> Documents & KYC
            </button>
            <button onClick={() => setActiveTab('timeline')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'timeline' ? 'bg-[#0B1F4D] text-white shadow-md' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}>
              <Clock size={16} /> Activity Timeline
            </button>
            
            <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Quick Status</h4>
              
              <div className="mb-4">
                <label className="text-[10px] font-bold text-slate-500 block mb-1">KYC Status</label>
                <select 
                  value={draftKycStatus} 
                  onChange={(e) => setDraftKycStatus(e.target.value)}
                  className={`w-full text-xs font-bold p-2 rounded border focus:outline-none ${draftKycStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : draftKycStatus === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-200' : draftKycStatus === 'UNDER_REVIEW' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="UNDER_REVIEW">UNDER REVIEW</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Application</label>
                <select 
                  value={draftApplicationStatus} 
                  onChange={(e) => setDraftApplicationStatus(e.target.value)}
                  className={`w-full text-xs font-bold p-2 rounded border focus:outline-none ${draftApplicationStatus === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : draftApplicationStatus === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-200' : draftApplicationStatus === 'REQUEST_MORE_DOCUMENTS' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REQUEST_MORE_DOCUMENTS">REQ MORE DOCS</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-white p-6 md:p-8">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 animate-in fade-in duration-300">
                {/* Personal Info */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-black text-[#0B1F4D] border-b border-slate-100 pb-2 mb-4">
                    <User size={16} className="text-blue-500" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField('Applicant Name', member.fullName)}
                    {renderField('Father Name', member.fatherName)}
                    {renderField('Mother Name', member.motherName)}
                    {renderField('Date of Birth', member.dob ? new Date(member.dob).toLocaleDateString() : '')}
                    {renderField('Age', member.age)}
                    {renderField('Gender', member.gender)}
                    {renderField('Occupation', member.occupation)}
                    {renderField('Category', member.category)}
                    {renderField('Marital Status', member.maritalStatus)}
                    {renderField('Aadhaar Number', member.aadhaarNumber)}
                    {renderField('PAN Number', member.panNumber)}
                  </div>
                </div>

                {/* Contact & Address */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-black text-[#0B1F4D] border-b border-slate-100 pb-2 mb-4">
                    <MapPin size={16} className="text-blue-500" /> Contact & Address
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField('Mobile Number', member.mobileNumber)}
                    {renderField('Alternate Mobile', member.alternateMobile)}
                    {renderField('Email Address', member.email)}
                    <div className="col-span-2">
                      {renderField('Permanent Address', `${member.houseNo || ''}, ${member.street || ''}, ${member.village || ''}, ${member.mandal || ''}, ${member.district || ''}, ${member.state || ''} - ${member.pinCode || ''}`)}
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-black text-[#0B1F4D] border-b border-slate-100 pb-2 mb-4">
                    <Landmark size={16} className="text-blue-500" /> Bank Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField('Bank Name', member.bankName)}
                    {renderField('Account Holder', member.accountHolder)}
                    {renderField('Account Number', member.accountNumber)}
                    {renderField('IFSC Code', member.ifscCode)}
                    {renderField('Branch', member.bankBranch)}
                  </div>
                </div>

                {/* Membership & Nominee */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-black text-[#0B1F4D] border-b border-slate-100 pb-2 mb-4">
                    <Briefcase size={16} className="text-blue-500" /> Membership & Nominee
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {renderField('Membership Type', member.membershipType)}
                    {renderField('Total Paid', `₹${member.totalAmount}`)}
                    {renderField('Payment Status', member.paymentStatus)}
                    {renderField('Nominee Name', member.nomineeName)}
                    {renderField('Relationship', member.nomineeRelationship)}
                    {renderField('Introducer', member.introducerName)}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="animate-in fade-in duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Document List */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-black text-[#0B1F4D] mb-4">Uploaded Documents</h3>
                    {documents.length === 0 ? (
                      <p className="text-sm text-slate-500">No documents uploaded.</p>
                    ) : (
                      documents.map((doc, idx) => {
                        const fileUrl = doc.url.startsWith('http') ? doc.url : `${API_URL}/${doc.url}`;
                        return (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-white shadow-sm transition-all group">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.type === 'pdf' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                {doc.type === 'pdf' ? <FileText size={24} /> : <FileImage size={24} />}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-800">{doc.name}</span>
                                <span className="text-[11px] text-slate-500">Document Uploaded</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setPreviewDoc({ ...doc, url: fileUrl })} className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">Preview</button>
                              <a href={fileUrl} target="_blank" rel="noreferrer" download className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Download size={16} />
                              </a>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Verification Notes */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 h-fit">
                    <h3 className="text-xs font-black text-[#0B1F4D] uppercase tracking-wider mb-4">Admin Verification Notes</h3>
                    <textarea 
                      value={draftNotes} 
                      onChange={e => setDraftNotes(e.target.value)}
                      placeholder="E.g., PAN verified. Aadhaar photo is a bit blurry..."
                      className="w-full h-32 p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none bg-white mb-3"
                    ></textarea>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="animate-in fade-in duration-300 max-w-2xl">
                <h3 className="text-sm font-black text-[#0B1F4D] mb-6">Activity Timeline</h3>
                <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                  {member.events && member.events.length > 0 ? (
                    member.events.map((event, i) => (
                      <div key={event.id || i} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${event.type === 'STATUS' ? 'bg-blue-500' : event.type === 'DOCUMENT' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-sm">{event.title}</span>
                          <span className="text-[10px] text-slate-400 font-medium mt-0.5">{new Date(event.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="pl-6 text-sm text-slate-500">No activity recorded yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-3 justify-end items-center mt-auto">
          <button onClick={() => setRejectModalOpen(true)} className="px-5 py-2.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors">Reject Member</button>
          <button onClick={() => setRequestDocsModalOpen(true)} className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">Request Documents</button>
          <button onClick={handleSaveChanges} disabled={loading} className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B1F4D] rounded-xl hover:bg-[#152e69] transition-colors disabled:opacity-50">Save Changes</button>
          <button 
            title={(draftKycStatus !== 'APPROVED' || draftApplicationStatus !== 'APPROVED') ? "Both KYC and Application must be APPROVED to verify." : ""}
            disabled={draftKycStatus !== 'APPROVED' || draftApplicationStatus !== 'APPROVED' || loading}
            onClick={() => { if(window.confirm('Approve Application?')) submitStatusUpdate({ applicationStatus: 'APPROVED' }) }} 
            className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Approve Member
          </button>
        </div>

      </div>

      {/* Document Preview Modal inside Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col">
          <div className="flex justify-between items-center p-4 text-white border-b border-white/10">
            <h3 className="font-bold text-sm">{previewDoc.name}</h3>
            <div className="flex items-center gap-4">
              <a href={previewDoc.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white bg-white/10 px-4 py-2 rounded-lg transition-colors">
                <Maximize2 size={14} /> Open Native
              </a>
              <button onClick={() => setPreviewDoc(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            {previewDoc.type === 'pdf' ? (
              <iframe src={previewDoc.url} className="w-full h-full max-w-5xl bg-white rounded-xl shadow-2xl" title={previewDoc.name} />
            ) : (
              <div className="overflow-auto max-w-full max-h-full">
                <img src={previewDoc.url} alt={previewDoc.name} className="max-w-none hover:scale-125 transition-transform duration-300 cursor-zoom-in" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-rose-600 mb-2">Reject Application</h3>
            <p className="text-xs text-slate-500 mb-4">Please provide a reason for rejecting this membership application.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Invalid documents', 'Duplicate application', 'Incorrect information', 'KYC failed', 'Payment not verified', 'Other'].map(preset => (
                <button key={preset} onClick={() => setRejectReason(preset)} className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 font-medium transition-colors">
                  {preset}
                </button>
              ))}
            </div>
            <textarea
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-50"
              rows={3}
              placeholder="Or enter custom reason here..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setRejectModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Cancel</button>
              <button onClick={executeReject} className="px-4 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg shadow-md shadow-rose-500/20">Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Docs Modal */}
      {requestDocsModalOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-amber-600 mb-2">Request More Documents</h3>
            <p className="text-xs text-slate-500 mb-4">Specify which documents are missing or invalid.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Aadhaar image not clear', 'PAN card missing', 'Signature mismatch', 'Upload bank passbook', 'Upload passport photo'].map(preset => (
                <button key={preset} onClick={() => setRequestDocsReason(preset)} className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 font-medium transition-colors">
                  {preset}
                </button>
              ))}
            </div>
            <textarea
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-50"
              rows={3}
              placeholder="Or enter custom remarks here..."
              value={requestDocsReason}
              onChange={(e) => setRequestDocsReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setRequestDocsModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Cancel</button>
              <button onClick={executeRequestDocs} className="px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md shadow-amber-500/20">Send Request</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MemberDetailModal;
