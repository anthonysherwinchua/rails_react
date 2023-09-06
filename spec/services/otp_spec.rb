require 'rails_helper'

describe Otp do
  subject { described_class.new(user.otp_secret, integer) }

  let(:user) { create(:user) }
  let(:integer) { 1 }

  it { expect(subject.generate.length).to eq(6) }

  describe 'has a different result when integer is different' do
    let(:different_integer) { 2 }
    let(:another_otp) { described_class.new(user.otp_secret, different_integer) }


    it { expect(subject.generate).not_to eq(another_otp.generate) }
  end

  describe '#verify' do
    context 'user has input the correct otp' do
      let(:integer) { Time.now.to_i }

      it { expect(subject.verify).to be_true }
    end

    it 'user has input the incorrect otp' do
    end
  end
end