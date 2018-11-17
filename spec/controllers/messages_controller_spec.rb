require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  #メッセージ一覧ページを表示するアクション
  describe '#index' do
    #ログインしている場合
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      #アクション内で定義しているインスタンス変数(message)があるか
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      #アクション内で定義しているインスタンス変数(group)があるか
      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      #該当するビューが描画されているか
      it 'render index' do
        expect(response).to render_template :index
      end
    end

    #ログインしていない場合
    context 'not log in' do
      before do
        get :index, params:{ group_id: group.id }
      end

      #意図したビューにリダイレクトできているか
      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  #メッセージを作成するアクション
  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    #ログインしている
    context 'log in' do
      before do
        login user
      end

      #保存に成功した
      context 'can save' do
        subject {
          post :create,
          params: params
        }

        #メッセージの保存はできたのか
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        #意図した画面に遷移しているか
        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      #保存に失敗した
      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        #メッセージの保存は行われなかったか
        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        #意図したビューが描画されているか
        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    #ログインしていない場合
    context 'not log in' do
      #意図した画面にリダイレクトできているか
      it 'rendercts to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
