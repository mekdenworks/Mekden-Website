          </label>

          <button
            type="button"
            className="button button-dark full-button"
            onClick={submitOrder}
            disabled={!orderName.trim() || !orderEmail.trim()}
            style={{ width: "100%", marginTop: "16px" }}
          >
            Continue to Payment <ArrowRight size={17} />
          </button>
        </>
      )}

      {paymentStep === "payment" && (
        <>
          <div className="upi-panel">
            <div className="upi-panel-head">
              <span>UPI PAYMENT</span>
              <span className="setup-tag">READY TO PAY</span>
            </div>

            <p>
              Pay exactly <b>₹{selectedPlan.price}</b> using any UPI app.
            </p>

            <div className="upi-id">
              {STORE_CONFIG.upiId}
              <button type="button" onClick={copyUpi}>
                {copied ? <Check size={16} /> : "Copy"}
              </button>
            </div>

            <p className="small-warning">
              Open your UPI app, enter the UPI ID above, and pay the exact
              amount. Keep your UTR and payment screenshot ready.
            </p>
          </div>

          <button
            type="button"
            className="button button-dark full-button"
            onClick={() => setPaymentStep("utr")}
            style={{ width: "100%", marginTop: "16px" }}
          >
            I've Completed Payment <ArrowRight size={17} />
          </button>

          <button
            type="button"
            className="button button-outline full-button"
            onClick={() => setPaymentStep("details")}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Back
          </button>
        </>
      )}

      {paymentStep === "utr" && (
        <div style={{ marginTop: "16px" }}>
          <label htmlFor="transactionId">
            UPI Transaction ID / UTR
          </label>

          <input
            id="transactionId"
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter your UTR number"
            style={{ width: "100%", marginTop: "8px" }}
          />

          <p className="small-warning">
            Enter the transaction reference from your UPI payment history.
          </p>
          <label
  htmlFor="paymentScreenshot"
  style={{ display: "block", marginTop: "16px" }}
>
  Payment Screenshot
</label>

<input
  id="paymentScreenshot"
  type="file"
  accept="image/png,image/jpeg,image/webp"
  onChange={(e) => setScreenshotFile(e.target.files?.[0] ?? null)}
  style={{ width: "100%", marginTop: "8px" }}
/>

<p className="small-warning">
  Upload PNG, JPG or WEBP. Maximum file size: 5 MB.
</p>

          <button
            type="button"
            className="button button-dark full-button"
            onClick={submitTransactionId}
            disabled={utrSubmitting || !transactionId.trim()}
            style={{ width: "100%", marginTop: "12px" }}
          >
            {utrSubmitting ? "Submitting..." : "Submit Payment Details"}
          </button>

          <button
            type="button"
            onClick={() => setPaymentStep("payment")}
            style={{ marginTop: "10px" }}
          >
            Back to Payment
          </button>
        </div>
      )}

      <p className="modal-footnote">
        Order reference: {orderRef} · Your order will be delivered after
        payment verification.
      </p>
    </div>
  </div>
      )}
    </div>
  );
}

export default App;
