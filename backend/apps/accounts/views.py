from django.contrib.auth import get_user_model, authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import generic, View

from .forms import SignUpForm, LoginForm
from .mixins import CustomLoginRequiredMixin

User = get_user_model()


class SignUpView(generic.CreateView):
    model = User
    queryset = User.objects.all()
    form_class = SignUpForm
    template_name = 'accounts/register_page.html'
    success_url = reverse_lazy('personal-area')

    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.user.is_authenticated:
            logout(self.request)

        user = authenticate(self.request,
                            email=form.cleaned_data['email'],
                            password=form.cleaned_data['password1'])
        if user is not None:
            login(self.request, user)
        return response

    def form_invalid(self, form):
        return render(self.request, "accounts/invalidForm.html", {"form": form})


class SignUpAsReferralView(SignUpView):
    def form_valid(self, form):
        form.instance.referral_of = User.objects.get(id=self.kwargs['pk'])
        return super().form_valid(form)


class LoginView(View):
    def get(self, request):
        form = LoginForm()
        return render(request, 'accounts/login_page.html', context={"form": form})

    def post(self, request):
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect(reverse_lazy('personal-area'))
        else:
            return HttpResponse('Неверная почта или пароль')


class LogoutView(View):
    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
        return redirect(reverse_lazy('login'))


class PersonalAreaView(CustomLoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'accounts/personal_area.html')


def csrf_failure(request, *args, **kwargs):
    return HttpResponse('Ошибка. Обновите страничку и попробуйте снова')
