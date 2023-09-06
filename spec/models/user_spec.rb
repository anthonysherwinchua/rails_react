require 'rails_helper'

RSpec.describe User, type: :model do
  subject { create(:user) }

  it { expect(subject.otp_secret).not_to be_blank }
  it { expect(subject.otp_secret.length).to eq(32) }
end
